from flask_restful import Api, Resource, reqparse
from server.models.answer import AnswerModel

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