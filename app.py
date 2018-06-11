'''
endpoints for the web app
'''
from server import create_app, db
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
    parser = reqparse.RequestParser()
    parser.add_argument("usr_ans1",
                        type=str,
                        required=True
                        )
    parser.add_argument("usr_ans2",
                        type=str,
                        required=True
                        )
    def get(self, id_):
        ans = AnswerModel.get_answer_by_id(id_)
        if ans:
            return ans.json()
        return {'message':'answer to question with id {} does not exist'.format(id_)}, 404

    def post(self, id_):
        ans = AnswerModel.get_answer_by_id(id_)
        data = Answer.parser.parse_args()
        ans_list = sorted([data['usr_ans1'], data['usr_ans2']])
        if ans.answer1 == ans_list[0] and ans.answer2 == ans_list[1]:
            return {'message': 'answer is correct'}
        return {'message': 'answer is incorrect'}


api.add_resource(Question, '/one_question')
api.add_resource(QuestionList,'/questions')
api.add_resource(Answer, '/answer/<int:id_>')


with flask_app.app_context():
    db.create_all()
    flask_app.run()
