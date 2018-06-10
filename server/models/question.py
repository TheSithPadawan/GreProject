from Server import db

'''
currently only supports questions 
with 6 answers A - F
'''
class Question(db.Model):
    __tablename__ = 'question'
    id = db.Column(db.Integer, primary_key=True, unique=True)
    text = db.Column(db.String(5000), nullable=False)
    question_id = db.Column(db.Integer, unique=True)
    a = db.Column(db.String(5000), nullable=False)
    b = db.Column(db.String(5000), nullable=False)
    c = db.Column(db.String(5000), nullable=False)
    d = db.Column(db.String(5000), nullable=False)
    e = db.Column(db.String(5000), nullable=False)
    f = db.Column(db.String(5000), nullable=False)

    def __init__(self, question_id, text, a, b, c, d, e, f):
        self.question_id = question_id
        self.text = text
        self.a = a
        self.b = b
        self.c = c
        self.d = d
        self.e = e
        self.f = f
