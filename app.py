from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import render_template
import json
app = Flask(__name__)

app.config.update(
    SECRET_KEY = 'Florence', # need a better key for app security
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:Florence@localhost/gre_db',
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)

db = SQLAlchemy(app)
@app.route('/')
def get_data():
    query = db.session.query(Question).all()
    output = []
    for row in query:
            output.append({"question":row.text, "options":row.choices})
    return json.dumps(output)


class Question(db.Model):
    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True, unique = True)
    text = db.Column(db.String(5000), nullable=False)
    choices = db.Column(db.String(5000), nullable=False)

    def __init__(self, text, choices, qid):
        self.text = text
        self.choices = choices
        self.id = qid

    def __repr__(self): # for debug purpose
        return self.text + '\n' + self.choices


class Answer(db.Model):
    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True)
    answers = db.Column(db.String(100), nullable=False)
    # relationship
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))

    def __init__(self, ans, qid):
        self.answers = ans
        self.question_id = qid

    def __repr__(self):
        return 'answer to question id {} is {}'.format(self.question_id, self.answers)

if __name__ == '__main__':
    db.create_all()
    app.run(debug = True)
