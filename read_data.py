import csv
from app import db, Question, Answer

with open ("data.csv", 'rU') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        question = row['Question']
        choices = row['Choices']
        answer = row['Answer']
        qid = row['QID']
        q = Question(question, choices, qid)
        db.session.add_all([q])
        db.session.commit()
        a = Answer(answer, qid)
        db.session.add_all([a])
        db.session.commit()
