from flask_restful import Resource, reqparse
from server.models.subscribe import SubscribeModel
from server.models.question import QuestionModel
from flask_jwt_extended import jwt_required, get_jwt_identity,get_raw_jwt
from server import db

parser = reqparse.RequestParser()
parser.add_argument('questionID')

class Myfav(Resource):
    @jwt_required
    def get(self):
        current_user = str(get_jwt_identity())
        print ("current user id " + current_user)
        subscribe_model_list = SubscribeModel.find_by_username(current_user)
        question_id_list = []
        for model in subscribe_model_list :
            question_id_list.append(model.question_id)
        print (question_id_list)
        return question_id_list


class Subscribe(Resource):
    @jwt_required
    def post(self):
        current_user = str(get_jwt_identity())
        print("current user " + current_user)
        args = parser.parse_args()
        subsrcibe = SubscribeModel(current_user, args['questionID'])
        subsrcibe.save_to_db()

class Unsubscribe(Resource):
    @jwt_required
    def post(self):
        current_user = str(get_jwt_identity())
        args = parser.parse_args()
        subsrcibe = SubscribeModel(current_user, args['questionID'])
        subsrcibe.delete_from_db()
