'''
main entry to the program
'''
from server import create_app, db
import csv

def init_db():
    from server.models import question
    with open ('data.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            question = row['Text']
            id = row['QuestionID']
            A = row['A']
            B = row['B']
            C = row['C']
            D = row['D']
            E = row['E']
            F = row['F']
            q = question.Question(id, question, A, B, C, D, E, F)
            db.session.add_all([q])
            db.session.commit()

flask_app = create_app()

with flask_app.app_context():
    db.create_all()
    flask_app.run()
