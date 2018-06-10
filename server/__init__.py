from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap


db = SQLAlchemy()
bootstrap = Bootstrap()

#todo: register blueprints
def create_app():
    app = Flask(__name__)
    configuration = '../Config/dev.py'
    # using info in dev.py to config the current app
    # mainly the database credentials
    app.config.from_pyfile(configuration)
    # initialize database
    db.init_app(app)

    # bind to bootstrap
    bootstrap.init_app(app)

    #register blueprints
    from Server.Controller import main
    app.register_blueprint(main)
    return app

