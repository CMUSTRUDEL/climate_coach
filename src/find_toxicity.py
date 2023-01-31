import pandas as pd
import requests
import json
import time
import os
from config import *
#from googleapiclient import discovery
from SentiCR import SentiCR

googleAPIKey = os.environ["PERS_API"]
perspectiveUrl = ("https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze" + \
    "?key=" + googleAPIKey)

# sentiment analysis for code review
oracle_data = pd.read_csv("SentiCR/oracle.csv")
SentiCR_model = SentiCR.SentiCR(algo="GBT",training_data= oracle_data)


def _get_perspective_score(text):
  data_dict = {
      "comment": {
          "text": text
      },
      "requestedAttributes": {
          "TOXICITY": {},
          "IDENTITY_ATTACK": {}
      }
  }

  try:
    response = requests.post(url=perspectiveUrl, data=json.dumps(data_dict))
    response_dict = json.loads(response.content.decode("utf-8"))
    toxicity = response_dict["attributeScores"]["TOXICITY"]["summaryScore"]["value"]
    identity_attack = response_dict["attributeScores"]["IDENTITY_ATTACK"]["summaryScore"]["value"]
    return [toxicity, identity_attack]
  except:
    time.sleep(10)
    response = requests.post(url=perspectiveUrl, data=json.dumps(data_dict))
    response_dict = json.loads(response.content.decode("utf-8"))
    try:
      toxicity = response_dict["attributeScores"]["TOXICITY"]["summaryScore"]["value"]
      identity_attack = response_dict["attributeScores"]["IDENTITY_ATTACK"]["summaryScore"]["value"]
      return [toxicity, identity_attack]
    except:
      return [-1, -1]


def find_toxicity(repo, convs, since, end):
  toxic_convs = []
  neg_senti = []

  cur_convs = convs.loc[
        (convs["created_at"]>=since) &
        (convs["created_at"]<end)]

  toxics = []
  attacks = []
  for i, conv in cur_convs.iterrows():
    issue = repo.get_issue(number=conv["number"])

    comments = issue.get_comments()
    for comment in comments:
      print("comment", comment)
      [toxic, attack] = _get_perspective_score(comment.body)
      toxics.append(toxic)
      attacks.append(attack)
      if toxic > TOXIC_THRES or attack > TOXIC_THRES:
        toxic_convs.append({
              "title": issue.title,
              "link": issue.html_url
        })
      senti_score = SentiCR_model.get_sentiment_polarity(comment.body)[0]
      if senti_score < 0:
        neg_senti.append({
              "title": issue.title,
              "link": comment.html_url
        })

  max_toxic = max(toxics)
  max_attack = max(attacks)
  print("max", max_toxic, max_attack)

  return {"toxic": toxic_convs,
          "max_toxic": max_toxic, 
          "max_attack": max_attack,
          "neg_senti": neg_senti}
