'''
endpoints for the web app
'''
from server import create_app, db, BLACKLIST
from server.resources.user_resource import UserRegister, UserLogin, TokenRefresh, UserLogout
from server.resources.question_resource import Question, QuestionList
from server.resources.answer_resource import Answer
from server.resources.history_resource import MyHistory, MyQuestionHistory
from server.resources.subscribe_resource import (Subscribe, Unsubscribe, Myfav)
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask import Flask, jsonify
from flask_cors import CORS


flask_app = create_app()
flask_app.secret_key = 'topsecret'
api = Api(flask_app)
CORS(flask_app, origins="http://localhost:4200", allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
    supports_credentials=True, intercept_exceptions=False)


# register with JWTManager
jwt = JWTManager(flask_app)
# JWT related configuration
flask_app.config['JWT_BLACKLIST_ENABLED'] = True
flask_app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

'''
customized JWT configuration
'''
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

# check if a token is blacklisted
@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    return decrypted_token['jti'] in BLACKLIST

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        "description": "Request does not contain an access token.",
        'error': 'authorization_required'
    }), 401

@jwt.needs_fresh_token_loader
def token_not_fresh_callback():
    return jsonify({
        "description": "The token is not fresh.",
        'error': 'fresh_token_required'
    }), 401


# adding resources
api.add_resource(Question, '/one_question', endpoint = 'get_random_question')
api.add_resource(Question, '/one_question/<int:id_>', endpoint = 'get_question_by_id')
api.add_resource(QuestionList,'/questions')
api.add_resource(Answer, '/answer/<int:id_>')
api.add_resource(UserRegister, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(TokenRefresh, '/refresh')
api.add_resource(UserLogout, '/logout')
api.add_resource(Myfav, '/myfav', endpoint = 'get')
api.add_resource(Subscribe, '/subscribe', endpoint = 'subscribe')
api.add_resource(Unsubscribe, '/unsubscribe', endpoint = 'unsubscribe')
api.add_resource(MyHistory, '/myhistory')
api.add_resource(MyQuestionHistory, '/myquestionhistory/<int:question_id_>')

if __name__ == "__main__":
    with flask_app.app_context():
        db.create_all()
        flask_app.run()
