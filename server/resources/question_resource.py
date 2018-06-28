from flask_restful import Api, Resource, reqparse
from server.models.question import QuestionModel

class Question(Resource):
    def get(self, id_=None):
        if id_ is None:
            return QuestionModel.get_random_question().json()
        else:
            q = QuestionModel.get_question_by_id(id_)
            if q is None:
                return {'message': "question of id {} does not exist".format(id_)}, 404
            return q.json()


class QuestionList(Resource):
    def get(self):
        return {'questions': [q.json() for q in QuestionModel.query.all()]}