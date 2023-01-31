from config import *
from datetime import datetime
from find_toxicity import find_toxicity
from helper import _get_time, _check_quota, _get_bots
import copy
import pandas as pd
import statistics
import time

bots = _get_bots()


# for each user, get all their prev issues/prs
# check if the first one is within this month
def _find_new_authors(repo, conv_type, since, users, g):
  new_authors = []
  recur_authors = []
  if DEBUG:
    print(len(users))
  ind = 0
  tenures = []

  for user in users:
    g, repo = _check_quota(g, repo)
    user_conv = repo.get_issues(
            state="all", 
            creator=user,
            sort="created_at",
            direction="asc")

    found = False
    count = 0
    # keep finding until we found the correct type: issue/pr
    for u_conv in user_conv:
      try:
        ind_res = repo.get_issue(number=u_conv.number)
      except:
        g, repo = _check_quota(g, repo)
        ind_res = repo.get_issue(number=u_conv.number)
      ind+=1
      if ind > 200:
        print(ind)
        g, repo = _check_quota(g, repo)
        ind = 0

      # calculate tenure
      if count == 0:
        tenures.append((datetime.today() - ind_res.created_at).days/30)

      if conv_type == "issue":
        if ind_res.pull_request is None:
          found = True
      elif conv_type == "pr":
        if ind_res.pull_request is not None:
          found = True
      if found: break

    # if the first one is created within this month, then they're new
    if ind_res.created_at >= since:
      new_authors.append(user)
    else:
      recur_authors.append(user)

  if DEBUG:
    print(recur_authors)

  if len(tenures) == 0:
    mean_tenures = 0
  else:
    mean_tenures = statistics.mean(tenures)
  return new_authors, mean_tenures, recur_authors
  

def cal_metrics(repo, conv_type, all_dis, comments, win, g):
  if len(all_dis) == 0:
    res = {
        "num_closed": 0,
        "num_closed_0_comments": 0,
        "avg_close_time": 0,
        "median_close_time": 0,
        "median_comments_recent": 0,
        "avg_comments_recent": 0,
        "num_open": 0,
        "num_unique_authors": 0,
        "unique_authors": [],
        "new_authors": [],
        "num_new_authors": 0,
        "recur_authors": [],
        "num_recur_authors": 0,
        "avg_comments": 0,
        "median_commenst": 0,
        "new_label_counts": {},
        "num_toxic": 0,
        "toxic": [],
        #"neg_senti": [],
        "max_toxic": 0,
        "max_attack": 0,
        "avg_comments_before_close": 0
    }
    return res

  since = _get_time(win)
  end = _get_time(win-1)

  # closed in that month
  # can be created before that month
  # closed = merged + closed not merged
  cur_win_closed = all_dis.loc[
          (all_dis["state"]=="closed") &
          (all_dis["closed_at"]>=since) &
          (all_dis["closed_at"]<end)]
  num_closed = len(cur_win_closed)

  if num_closed > 0:
    # calculate avg time before close
    median_close_time = statistics.median(cur_win_closed["close_len"])
    avg_close_time = statistics.mean(cur_win_closed["close_len"])
    # avg num comments before closing
    median_comments_before_close = statistics.median(cur_win_closed["num_comments"])
    avg_comments_before_close = statistics.mean(cur_win_closed["num_comments"])
  else:
    median_close_time = 0
    avg_close_time = 0
    median_comments_before_close = 0
    avg_comments_before_close = 0

  # open in that month
  cur_win_open = all_dis.loc[
          (all_dis["created_at"]>=since) &
          (all_dis["created_at"]<end)]
  num_open = len(cur_win_open)
  if num_open > 0:
    median_comments_recent = statistics.median(cur_win_open["num_comments"])
    avg_comments_recent = statistics.mean(cur_win_open["num_comments"])
  else:
    median_comments_recent = 0
    avg_comments_recent = 0

	# remove bots
  non_bot_authors = [author for author in cur_win_open["author"].tolist() if author not in bots]

  # users who opened issue/pr in that month
  unique_authors = list(set(non_bot_authors))
  num_unique_authors = len(unique_authors)

  # we only care about new contributors in the past month
  new_authors, avg_tenure, recur_authors = _find_new_authors(repo, conv_type, since, unique_authors, g)
  new_authors = [n.login for n in new_authors]
  num_new_authors = len(new_authors)
  recur_authors = [n.login for n in recur_authors]
  num_recur_authors = len(recur_authors)
  print(recur_authors)

  unique_authors = [a.login for a in unique_authors]

  # get toxicity scores and sentiment analysis
  comments = comments.loc[
          (comments["created_at"]>since) &
          (comments["created_at"]<end)]
  toxic_convs = find_toxicity(repo, comments)
  num_toxic = len(toxic_convs["toxic"])# + len(toxic_convs["neg_senti"])

  res = {
      "num_closed": num_closed,
      "num_closed_0_comments": len(
              cur_win_closed.loc[
                    cur_win_closed["num_comments"]==0]),
      "median_close_time": round(median_close_time, 1),
      "avg_close_time": round(avg_close_time, 1),
      "num_open": num_open,
      "num_unique_authors": num_unique_authors,
      "unique_authors": copy.deepcopy(unique_authors),
      "new_authors": copy.deepcopy(new_authors),
      "num_new_authors": num_new_authors,
      "recur_authors": copy.deepcopy(recur_authors),
      "num_recur_authors": num_recur_authors,
      "avg_tenure": avg_tenure,
      "median_comments_before_close": round(median_comments_before_close, 1),
      "avg_comments_before_close": round(avg_comments_before_close, 1),
      "median_comments_recent": round(median_comments_recent, 1),
      "avg_comments_recent": round(avg_comments_recent, 1),
      "num_toxic": num_toxic,
      "toxic": copy.deepcopy(toxic_convs["toxic"]),
      #"neg_senti": copy.deepcopy(toxic_convs["neg_senti"]),
      "max_toxic": round(toxic_convs["max_toxic"], 3),
      "max_attack": round(toxic_convs["max_attack"], 3)
  }
  return res
