'''
endpoints for the web app
'''
from server import create_app, db
import csv
from flask_restful import Api, Resource, reqparse
from server.models.question import QuestionModel
from server.models.answer import AnswerModel
from flask import request

flask_app = create_app()
api = Api(flask_app)

class Question(Resource):
    def get(self):
        return QuestionModel.get_random_question().json()

class QuestionList(Resource):
    def get(self):
        return {'questions': [q.json() for q in QuestionModel.query.all()]}

class Answer(Resource):
    def get(self, id_):
        ans = AnswerModel.get_answer_by_id(id_)
        if ans:
            return ans.json()
        return {'message':'answer to question with id {} does not exist'.format(id_)}, 404


api.add_resource(Question, '/one_question')
api.add_resource(QuestionList,'/questions')
api.add_resource(Answer, '/answer/<int:id_>')

if __name__ == "__main__":
    flask_app.run()
