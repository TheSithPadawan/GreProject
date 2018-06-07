from Server import db

class Answer(db.Model):
    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True)
    answer1 = db.Column(db.String(10), nullable=False)
    answer2 = db.Column(db.String(10), nullable=False)
    # relationship
    question_id = db.Column(db.Integer, db.ForeignKey('question.question_id'))

    def __init__(self, question_id, answer1, answer2):
        self.question_id = question_id
        self.answers1 = answer1
        self.answer2 = answer2