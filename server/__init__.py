from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
BLACKLIST = set()

#todo: register blueprints
def create_app():
    app = Flask(__name__)
    configuration = '../config/dev.py'
    # using info in dev.py to config the current app
    # mainly the database credentials
    app.config.from_pyfile(configuration)
    # initialize database
    db.init_app(app)
    return app

