from flask_restful import Api, Resource, reqparse
from server.models.answer import AnswerModel
from flask_jwt_extended import jwt_required, get_jwt_identity,get_raw_jwt

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

    @jwt_required
    def post(self, id_):
        ans = AnswerModel.get_answer_by_id(id_)
        data = Answer.parser.parse_args()
        ans_list = sorted([data['usr_ans1'], data['usr_ans2']])


        current_user = get_jwt_identity()
        if current_user is not None:
            # save to history
            question_history = QuestionHistoryModel(str(current_user), str(_id))
            history_id = question_history.save_to_db()
            usr_ans1 = AnswerHistoryModel(str(history_id), data['usr_ans1']);
            usr_ans2 = AnswerHistoryModel(str(history_id), data['usr_ans2']);
            usr_ans1.save_to_db();
            usr_ans2.save_to_db();





        if ans.answer1 == ans_list[0] and ans.answer2 == ans_list[1]:
            return {'message': 'answer is correct'}
        return {'message': 'answer is incorrect'}