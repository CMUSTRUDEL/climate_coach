from config import *
from datetime import datetime
from github import Github
from helper import _get_time, _mine_convers, _check_quota, _get_bots
import math
import statistics
import pandas as pd

bots = _get_bots()


def _compare():
  global TOKEN_ID
  g = Github(TOKENS[TOKEN_ID])
  # only compare data from the last month
  last_month = _get_time(1)
  current = _get_time(0)

  num_active_authors = []
  num_issue_closed = []
  num_pr_closed = []
  avg_time_issue = []
  avg_time_pr = []

  for proj in COMP_PROJS:
    issues = []
    prs = []

    print(proj)
    try:
      repo = g.get_repo(proj)
    except:
      g, repo = _check_quota(g, repo)
      repo = g.get_repo(proj)

    # get issues/prs from the past half a year
    try:
      res = repo.get_issues(
            state="all", 
            since=_get_time(6),
            direction="desc")
    except:
      [g, repo] = _check_quota(g, repo)
      res = repo.get_issues(
            state="all", 
            since=_get_time(6),
            direction="desc")
      
    count = 0
    for ind in res:
      count += 1
      if count % 500 == 0:
        g, repo = _check_quota(g, repo)

      num = ind.number
      try:
        ind_res = repo.get_issue(number=num)
      except:
        g, repo = _check_quota(g, repo)
        ind_res = repo.get_issue(number=num)

      # if it's closed before the past month, we don't need to care about it
      # all left are the ones that are still open or closed within the past
      # month
      if (ind_res.closed_at != None and ind_res.closed_at < last_month):
        break

      if ind_res.closed_at != None: 
        close_len = (ind_res.closed_at - ind_res.created_at).days
        open_for = close_len
      else:
        close_len = -1
        open_for = (datetime.today() - ind_res.created_at).days

      cur_dict = {
              "number":num,
              "title": ind_res.title,
              "url": ind_res.html_url,
              "author": ind_res.user,
              "created_at":ind_res.created_at,
              "closed_at":ind_res.closed_at,
              "merged_at": None,
              "state":ind_res.state,
              "close_len": close_len,
              "open_for": open_for,
              "num_comments":ind_res.comments,
              "label":[ind.name for ind in ind_res.labels]
      }

      # a pull request has a not none pull_request field
      g, repo = _check_quota(g, repo)
      if ind_res.pull_request != None:
        prs.append(cur_dict)
      else:
        issues.append(cur_dict)

    issues = pd.DataFrame(issues)
    prs = pd.DataFrame(prs)
    # num active authors
    non_bot_authors_i = [author for author in issues["author"].tolist() if author not in bots]
    non_bot_authors_p = [author for author in prs["author"].tolist() if author not in bots]
    num_active_authors.append(len(list(set(non_bot_authors_i).union(set(non_bot_authors_p)))))
 
    # num issue closed
    cur_win_closed_i = issues.loc[
          (issues["state"]!="open") &
          (issues["closed_at"]>=last_month) &
          (issues["closed_at"]<current)]
    num_issue_closed.append(len(cur_win_closed_i))

    # num pr closed
    cur_win_closed_p = prs.loc[
          (prs["state"]!="open") &
          (prs["closed_at"]>=last_month) &
          (prs["closed_at"]<current)]
    num_pr_closed.append(len(cur_win_closed_p))

    # avg time issue
    if len(cur_win_closed_i) == 0:
      avg_time_issue.append(0)
    else:
      avg_time_issue.append(math.ceil(statistics.mean(cur_win_closed_i["close_len"])))

    # avg time pr
    if len(cur_win_closed_p) == 0:
      avg_time_pr.append(0)
    else:
      avg_time_pr.append(math.ceil(statistics.mean(cur_win_closed_p["close_len"])))

  return {"num_active_authors": num_active_authors,
         "num_issue_closed": num_issue_closed,
         "num_pr_closed": num_pr_closed,
         "avg_time_issue": avg_time_issue,
         "avg_time_pr": avg_time_pr}
