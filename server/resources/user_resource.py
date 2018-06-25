from flask_restful import Resource, reqparse
from server.models.user import UserModel
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (create_access_token,
                                create_refresh_token,
                                jwt_refresh_token_required,
                                get_jwt_identity,
                                jwt_required,
                                get_raw_jwt)
from server import BLACKLIST

user_parser = reqparse.RequestParser()
user_parser.add_argument('username',
                    type=str,
                    required=True,
                    help="This field cannot be blank."
                    )
user_parser.add_argument('password',
                    type=str,
                    required=True,
                    help="This field cannot be blank."
                    )

"""
handles user registration
"""
class UserRegister(Resource):
    reg_parser = reqparse.RequestParser()
    reg_parser.add_argument('username',
                             type=str,
                             required=True,
                             help="This field cannot be blank."
                             )
    reg_parser.add_argument('password',
                             type=str,
                             required=True,
                             help="This field cannot be blank."
                             )
    reg_parser.add_argument('email',
                            type=str,
                            required=True,
                            help="This field cannot be blank"
                            )
    def post(self):
        data = self.reg_parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {"message": "A user with that username already exists"}, 400

        user = UserModel(**data)
        user.save_to_db()

        return {"message": "User created successfully."}, 201

"""
handles user authentication
"""
class UserLogin(Resource):
    def post(self):
        data = user_parser.parse_args()

        user = UserModel.find_by_username(data['username'])

        # if user found and password matched, issue valid JWT tokens
        if user and safe_str_cmp(user.password, data['password']):
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 200

        return {"message": "Invalid Credentials!"}, 401

"""
Grant user a new access token based on refresh token
"""
class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {'access_token': new_token}, 200

"""
Logs out a user by blocking token to the blacklist
"""
class UserLogout(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        BLACKLIST.add(jti)
        return {"message": "Successfully logged out"}, 200
