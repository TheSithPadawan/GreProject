from flask_restful import Resource, reqparse
from server.models.history import QuestionHistoryModel,AnswerHistoryModel
from server.models.answer import AnswerModel
from server.models.question import QuestionModel
from server.models.note import NoteModel
from flask_jwt_extended import jwt_required, get_jwt_identity,get_raw_jwt
from server import db
import json
from server.utils.apputil import apputil


parser = reqparse.RequestParser()
parser.add_argument('questionID')
parser.add_argument('note')


class MyQuestionNote(Resource):
    @jwt_required
    def get(self, question_id_ = None):
        if question_id_ == None:
            return 404

        current_user = str(get_jwt_identity())
        # current_user = "1"
        note = NoteModel.find_by_user_question(current_user, str(question_id_))
        map = {}
        map["note"] = note.note
        return map

class MyNote(Resource):
    @jwt_required
    def get(self):
        current_user = str(get_jwt_identity())
        # current_user = "1"

        notes = NoteModel.find_by_username(current_user)
        ret = []
        for note in notes:
            map = {}
            map['question_id'] = int(note.question_id)
            map['question'] = QuestionModel.get_question_by_id(int(note.question_id)).json()
            map['answer'] = AnswerModel.get_answer_by_id(int(note.question_id)).json()
            map['user_answer'] = AnswerModel.get_answer_by_id(int(note.question_id))
            question_history = QuestionHistoryModel.find_by_username_question(current_user, note.question_id)
            ans_list = []
            if len(question_history) >0:
                answer_list = AnswerHistoryModel.find_by_history(question_history.id)
                for answer in answer_list:
                    ans_list.append(int(answer.answer_id))

            map['user_answer'] = ans_list
            ret.append(map)
        return ret

class DeleteMyNote(Resource):
    @jwt_required
    def post(self):
        current_user = str(get_jwt_identity())
        # current_user = "1"
        args = parser.parse_args()
        note = NoteModel(current_user, str(args['questionID']), "")
        note.delete_from_db()
        reutrn 200

class AddMyNote(Resource):
    @jwt_required
    def post(self):
        current_user = str(get_jwt_identity())
        # current_user = "1"
        args = parser.parse_args()
        note = NoteModel(current_user, str(args['questionID']), str(args['note']))
        note.save_to_db()
        return 200





