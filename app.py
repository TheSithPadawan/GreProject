'''
endpoints for the web app
'''
from server import create_app, db
from server.resources.user_resource import UserRegister, UserLogin, TokenRefresh
from server.resources.question_resource import Question, QuestionList
from server.resources.answer_resource import Answer
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask import Flask


flask_app = create_app()
flask_app.secret_key = 'topsecret'
api = Api(flask_app)

# register with JWTManager
jwt = JWTManager(flask_app)

@jwt.expired_token_loader
def expired_token_callback():
    return jsonify({
        'message':'access token expired.',
        'error':'token_expired'
    }), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({
        'message':'token provided is invalid',
        'error': 'invalid_token'
    }), 401

@jwt.revoked_token_loader
def revoked_token_callback():
    return jsonify({
        'message': 'the token has been revoked.',
        'error': 'token_revoked'
    }), 401


# adding resources
api.add_resource(Question, '/one_question', endpoint = 'get_random_question')
api.add_resource(Question, '/one_question/<int:id_>', endpoint = 'get_question_by_id')
api.add_resource(QuestionList,'/questions')
api.add_resource(Answer, '/answer/<int:id_>')
api.add_resource(UserRegister, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(TokenRefresh, '/refresh')

if __name__ == "__main__":
    with flask_app.app_context():
        db.create_all()
        flask_app.run()
