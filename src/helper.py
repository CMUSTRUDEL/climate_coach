import dateutil.relativedelta
import pandas as pd
from datetime import datetime
from config import *
from github import Github


# read in the bot list
f = open("/data2/zihe/data/census/bot_names.list")
bots = set([l.strip() for l in f.readlines()])
f.close()


def _get_bots():
  return bots


# still testing
def _check_quota(g, repo):
  global TOKEN_ID
  quota = g.get_rate_limit().core.remaining
  if quota <= 500:
    g = Github(TOKENS[int(TOKEN_ID)])
    TOKEN_ID += 1
    TOKEN_ID = TOKEN_ID % len(TOKENS)
    print(TOKENS[TOKEN_ID])
    print("TOKEN_ID", TOKEN_ID)
    try:
      repo = g.get_repo(SLUG)
    except:
      print("TOKEN_ID", TOKEN_ID)
      g = Github(TOKENS[int(TOKEN_ID)])
      print(TOKENS[TOKEN_ID])
      TOKEN_ID += 1
      TOKEN_ID = TOKEN_ID % len(TOKENS)
    print("change token")
    quota = g.get_rate_limit().core.remaining
    print("remaining: ", quota)
  return [g, repo]


def _get_time(prev_month):
  d = datetime.today()
  since = d - dateutil.relativedelta.relativedelta(months=prev_month)
  since = datetime.combine(since, datetime.min.time())
  if DEBUG:
    print(since)
  return since


# get issues and prs created within the past half a year
def _mine_convers(g, repo, since):
  try:
    res = repo.get_issues(
          state="all", 
          since=since)
  except:
    [g, repo] = _check_quota(g, repo)
    # get issues/prs, sort from the most recent to distant
    res = repo.get_issues(
          state="all", 
          sort="created_at",
          direction="desc")


  issues = []
  issue_comments = []
  prs = []
  pr_comments = []
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

    # we only care about issues/prs closed within the past half a year
    # didn't want to sort by `closed_at` because some `closed_at` are None
    # if closed_at is before `since`, the create_at must also be before `since`
    if ind_res.closed_at != None and ind_res.closed_at < since:
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
    comments = ind_res.get_comments()
    if ind_res.pull_request != None:
      cur_pr = ind_res.as_pull_request()
      cur_dict["merged_at"] = cur_pr.merged_at
      cur_dict["merged"] = cur_pr.merged
      cur_dict["state"] = cur_pr.state
      prs.append(cur_dict)
      if DEBUG:
        print(cur_dict)
        print(cur_pr.merged)
      for comment in comments:
        pr_comments.append({
                "title": ind_res.title,
                "body": comment.body,
                "url": comment.html_url,
                "created_at": comment.created_at})
    else:
      issues.append(cur_dict)
      for comment in comments:
        issue_comments.append({
                "title": ind_res.title,
                "body": comment.body,
                "url": comment.html_url,
                "created_at": comment.created_at})

  if DEBUG:
    print(len(issues), len(prs))
  return [pd.DataFrame(issues), pd.DataFrame(prs),
          pd.DataFrame(issue_comments),
          pd.DataFrame(pr_comments)]
  
