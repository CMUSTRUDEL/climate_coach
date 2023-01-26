import os
import json
import time
from github import Github
import requests
from datetime import datetime
import pandas as pd
from cal_metrics import cal_metrics
from config import *
from collections import defaultdict
from helper import _get_time, _check_quota, _mine_convers
from compare import _compare


# count how many issue/pr in each label
def _count_labels(all_dis, since, end):
  if len(all_dis) == 0:
    return {}
  cur_win_open = all_dis.loc[
          (all_dis["created_at"]>=since) &
          (all_dis["created_at"]<end)]
  labels = cur_win_open["label"].tolist()
  labels = [f for l in labels for f in l]
  labels = list(set(labels))
  label_counts = {}
  for label in labels:
    contains = [label in dis_labels for dis_labels in all_dis["label"].tolist()]
    label_counts[label] = len(all_dis.iloc[contains])
  # sort labels by counts
  sorted_labels = sorted(label_counts.items(), key=lambda item: item[1])
  label_counts = {k: v for k, v in sorted_labels}
  return label_counts


# get all issues in the past half a year
def get_convs():
  res = {
        "issues": defaultdict(list),
        "prs": defaultdict(list),
        "commits": defaultdict(list)
  }

  # for large projects, each window can take up 1 token
  g = Github(TOKENS[0])

  repo = None
  try:
    repo = g.get_repo(SLUG)
  except:
    g, repo = _check_quota(g, repo)
    repo = g.get_repo(SLUG)
  quota = g.get_rate_limit().core.remaining
  print("remaining: ", quota)

  # get all issues/prs created within the past half a year
  since = _get_time(6)
  [issues, prs, issue_comments, pr_comments] = _mine_convers(g, repo, since)

  if DEBUG:
    issues.to_csv("test_issues.csv", index=False)
    prs.to_csv("test_prs.csv", index=False)

  # 1 means one month before, 4 means 4 months before
  for win in range(1, 5): 
    since = _get_time(win)
    end = _get_time(win-1)
    g, repo = _check_quota(g, repo)

    # get issue metrics
    metric_dict_issues = cal_metrics(repo, "issue", issues, issue_comments, win, g)
    for key in metric_dict_issues.keys():
      res["issues"][key].append(metric_dict_issues[key])
    # we only display label stats in the most recent month
    if win == 1:
      label_counts = _count_labels(issues, since, end)
      res["issues"]["label_counts_keys"] = list(label_counts.keys())
      res["issues"]["label_counts_values"] = list(label_counts.values())

    # get PR metrics
    g, repo = _check_quota(g, repo)
    metric_dict_prs = cal_metrics(repo, "pr", prs, pr_comments, win, g)
    for key in metric_dict_prs.keys():
      res["prs"][key].append(metric_dict_prs[key])
    if win == 1:
      label_counts = _count_labels(prs, since, end)
      res["prs"]["label_counts_keys"] = list(label_counts.keys())
      res["prs"]["label_counts_values"] = list(label_counts.values())

    # for the most recent window, point out conversations that need more
    # attention from the maintainers
    if win == 1:
      if len(issues) == 0:
        res["issues"]["long_standing"] = []
        res["issues"]["most_comments"] = []

      else:
        open_issues = issues.loc[issues["state"]=="open"]
        open_issues = open_issues.sort_values(
                by=["open_for"],
                ascending=False)
        res["issues"]["long_standing"] = [
                dict(x) for i, x in open_issues[["title", "url"]].iterrows()][:5]

        open_issues = open_issues.sort_values(
                by=["num_comments"],
                ascending=False)
        res["issues"]["most_comments"] = [
                dict(x) for i, x in open_issues[["title", "url"]].iterrows()][:5]
      if len(prs) == 0:
        res["prs"]["long_standing"] = []
        res["prs"]["most_comments"] = []
      else:
        open_prs = prs.loc[prs["state"]=="open"]
        open_prs = open_prs.sort_values(
                by=["open_for"],
                ascending=False)
        res["prs"]["long_standing"] = [
                dict(x) for i, x in open_prs[["title", "url"]].iterrows()][:5]


        open_prs = open_prs.sort_values(
                by=["num_comments"],
                ascending=False)
        res["prs"]["most_comments"] = [
                dict(x) for i, x in open_prs[["title", "url"]].iterrows()][:5]

    # dump intermediate output after each window
    out = open("out", "w")
    out.write(str(res))
    out.close()


  # we only need to display the list of authors in the most recent month
  res["issues"]["unique_authors"] = res["issues"]["unique_authors"][0]
  res["prs"]["unique_authors"] = res["prs"]["unique_authors"][0]
  res["issues"]["new_authors"] = res["issues"]["new_authors"][0]
  res["prs"]["new_authors"] = res["prs"]["new_authors"][0]
  print((res["issues"].keys()))
  res["issues"]["recur_authors"] = res["issues"]["recur_authors"][0]
  res["prs"]["recur_authors"] = res["prs"]["recur_authors"][0]

	# compute comparison
	# res["compare"] = _comp_comparison()

  # since we gathered data from recent to old, we need to reverse them. it's
  # easier for plotting
  print(res)
  for key in res["issues"]:
    res["issues"][key].reverse()
  for key in res["prs"]:
    res["prs"][key].reverse()
  return(res)


print(SLUG)
if not DEBUG:
  stats = get_convs()

  out = open("out_{}.json".format(slug_hash), "w")
  # output it as a list of dictionaries
  out.write("[")
  out.write(json.dumps(stats["issues"]))
  out.write(",")
  out.write(json.dumps(stats["prs"]))
  out.write(",")

if DEBUG:
  stats = {}
stats["compare"] = _compare()
if DEBUG:
  print(stats["compare"])
  exit(0)

# get stats for the comparison projects

# append current proj's stat - to save some queries and computations
stats["compare"]["num_active_authors"].insert(
        0,
        stats["issues"]["num_unique_authors"][0]+stats["prs"]["num_unique_authors"][0])
stats["compare"]["num_issue_closed"].insert(
        0,
        stats["issues"]["num_closed"][0])
stats["compare"]["num_pr_closed"].insert(
        0,
        stats["prs"]["num_closed"][0])
stats["compare"]["avg_time_issue"].insert(
        0,
        stats["issues"]["avg_close_time"][0])
stats["compare"]["avg_time_pr"].insert(
        0,
        stats["prs"]["avg_close_time"][0])
print(stats)

out.write(json.dumps(stats["compare"]))
out.write("]")
out.close()
