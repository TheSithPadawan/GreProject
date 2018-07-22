from flask_restful import Resource, reqparse
from server.models.history import QuestionHistoryModel,AnswerHistoryModel
from server.models.answer import AnswerModel
from flask_jwt_extended import jwt_required, get_jwt_identity,get_raw_jwt
from server import db
import json
from server.utils.apputil import apputil


class MyHistory(Resource):
    @jwt_required
    def get(self):
        current_user = str(get_jwt_identity())
        # current_user = "1"
        question_history_list = QuestionHistoryModel.find_by_username(current_user)
        res = []
        for question_history in question_history_list:
            map = {}
            correct_answer = AnswerModel.get_answer_by_id(int(question_history.question_id))
            user_answer = AnswerHistoryModel.find_by_history(str(question_history.id))
            map["time submitted"] = str(question_history.timestamp)
            map["question_id"] = question_history.question_id
            map["status"] = apputil.compare(correct_answer, user_answer)
            res.append(map)

        return res

class MyQuestionHistory(Resource):
    @jwt_required
    def get(self, question_id_ = None):
        if question_id_ == None:
            return 404

        current_user = str(get_jwt_identity())
        # current_user = "1"
        question_history_list = QuestionHistoryModel.find_by_username_question(current_user, str(question_id_))
        map = {}
        map["question_id"] = question_id_
        ans = [];
        map["usr_ans"] = ans
        for question_history in question_history_list:
            user_answer = AnswerHistoryModel.find_by_history(str(question_history.id))
            ans.append(user_answer[0].answer_id)
            ans.append(user_answer[1].answer_id)

        return map




