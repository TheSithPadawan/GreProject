# dev config
DEBUG = True
SECRET_KEY = 'Florence'
# local db
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/gredb'
# amazon RDS db
#SQLALCHEMY_DATABASE_URI = 'postgresql://postgresAdmin:Florence@gredb.cuql01p1pirt.us-west-1.rds.amazonaws.com/greDB'
#SQLALCHEMY_TRACK_MODIFICATIONS = False
#Disable cors
CORS_ENABLED = False