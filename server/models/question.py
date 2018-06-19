from server import db
import random

'''
currently only supports questions 
with 6 answers A - F
'''
class QuestionModel(db.Model):
    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True, unique=True)
    text = db.Column(db.String(5000), nullable=False)
    a = db.Column(db.String(5000), nullable=False)
    b = db.Column(db.String(5000), nullable=False)
    c = db.Column(db.String(5000), nullable=False)
    d = db.Column(db.String(5000), nullable=False)
    e = db.Column(db.String(5000), nullable=False)
    f = db.Column(db.String(5000), nullable=False)

    def __init__(self, text, a, b, c, d, e, f):
        self.text = text
        self.a = a
        self.b = b
        self.c = c
        self.d = d
        self.e = e
        self.f = f

    def json(self):
        return {'id': self.id, 'question':self.text, 'options':[{'A':self.a}, {'B': self.b}, {'C': self.c},
                                                 {'D': self.d}, {'E': self.e}, {'F': self.f}]}

    @classmethod
    def get_random_question(cls):
        questions=cls.query.all()
        num = random.randint(0, len(questions) - 1)
        return questions[num]

    @classmethod
    def get_question_by_id(cls, id_):
        return cls.query.filter_by(id=id_).first()


