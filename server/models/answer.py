from server import db

class AnswerModel(db.Model):
    __tablename__ = 'answer'
    id = db.Column(db.Integer, primary_key=True)
    answer1 = db.Column(db.String(10), nullable=False)
    answer2 = db.Column(db.String(10), nullable=False)
    # relationship
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    question = db.relationship('QuestionModel')

    def __init__(self, answer1, answer2):
        self.answer1 = answer1
        self.answer2 = answer2

    def json(self):
        return {'answer1': self.answer1, 'answer2': self.answer2}

    @classmethod
    def get_answer_by_id(cls, id_):
        return cls.query.filter_by(question_id=id_).first()
