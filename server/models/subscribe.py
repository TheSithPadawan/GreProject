from server import db

class SubscribeModel(db.Model):
    __tablename__ = 'subscribe'

    user_id = db.Column(db.String(20), primary_key=True)
    question_id = db.Column(db.String(20), primary_key=True)

    def __init__(self, user_id, question_id):
        self.user_id = user_id
        self.question_id = question_id

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, user_id):
        return cls.query.filter_by(user_id=user_id).all()

    def delete_from_db(self):
        obj = SubscribeModel.query.filter_by(user_id=self.user_id, question_id=self.question_id).first()
        db.session.delete(obj)
        db.session.commit()