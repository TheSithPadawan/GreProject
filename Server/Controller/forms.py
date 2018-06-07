from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class SubmitAnsForm(FlaskForm):
    ans1 = StringField('Answer 1', validators=[DataRequired()])
    ans2 = StringField('Answer 2', validators=[DataRequired()])
    submit = SubmitField('Submit')
