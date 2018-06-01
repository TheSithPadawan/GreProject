# server side code
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask import render_template
import json
from flask import jsonify

app = Flask(__name__)
app.config.update(
    SECRET_KEY = 'Florence',
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:Florence@localhost/gre_db',
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)

db = SQLAlchemy(app)
# main page that renders json from Question query
@app.route('/')
def get_data():
    query = db.session.query(Question).all()
    output = []
    for row in query:
            output.append({"question":row.text, "options":row.choices})
    return json.dumps(output)

# handles client post request for answer submission
@app.route('/action',methods = ['POST'])
def get_message():
    result = request.get_json()
    print(result['ans1'])
    print(result['ans2'])
    return "200"

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
