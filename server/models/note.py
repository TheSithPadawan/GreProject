from server import db

class NoteModel(db.Model):
    __tablename__ = 'notes'

    user_id = db.Column(db.String(20), primary_key=True)
    question_id = db.Column(db.String(20), primary_key=True)
    note =  db.Column(db.Text)

    def __init__(self, user_id, question_id, note):
        self.user_id = user_id
        self.question_id = question_id
        self.note = note

    def save_to_db(self):
        db.session.merge(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()

    @classmethod
    def find_by_user_question(cls, user_id, question_id):
        return cls.query.filter_by(user_id=user_id, question_id=question_id).first()

    def delete_from_db(self):
        obj = NoteModel.query.filter_by(user_id=self.user_id, question_id=self.question_id).first()
        if obj is not None:
            db.session.delete(obj)
            db.session.commit()