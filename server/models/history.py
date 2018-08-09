from server import db
import datetime

class QuestionHistoryModel(db.Model):
    __tablename__ = 'questionhistory'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(20))
    question_id = db.Column(db.String(20))
    timestamp = db.Column(db.DateTime, server_default=db.text("sysdate"))
    # timestamp = db.Column(db.DateTime)
    def __init__(self, user_id, question_id):
        self.user_id = user_id
        self.question_id = question_id

    def save_to_db(self):
        db.session.add(self)
        db.session.flush()
        db.session.refresh(self)
        return self.id

    @classmethod
    def find_by_username(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()

    @classmethod
    def find_by_username_question(cls, user_id, question_id):
        return cls.query.filter_by(user_id=user_id, question_id=question_id).order_by(cls.timestamp).all()

class AnswerHistoryModel(db.Model):
    __tablename__ = 'answerhistory'

    id = db.Column(db.Integer, primary_key=True)
    history_id = db.Column(db.String(20))
    answer_id = db.Column(db.String(20))

    def __init__(self, history_id, answer_id):
        self.history_id = history_id
        self.answer_id = answer_id

    def save_to_db(self):
        db.session.merge(self)
        db.session.commit()

    @classmethod
    def find_by_history(cls, history_id):
        return cls.query.filter_by(history_id=history_id).all()