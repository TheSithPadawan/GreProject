'''
DEPRECATED CODE: DO NOT USE
'''
from server.models import question, answer
from server import db
from server.controller import main
from flask import render_template, request, redirect, url_for, flash
from server.controller.forms import SubmitAnsForm

@main.route('/')
def display_questions():
    questions = db.session.query(question.Question).all()
    return render_template('home.html', questions=questions)

@main.route('/submit_answer/<question_id>', methods = ['POST', 'GET'])
def submit_ans(question_id):
    ans = db.session.query(answer.Answer).filter_by(question_id=question_id).first()
    form = SubmitAnsForm()
    # if it's a POST
    if form.validate_on_submit():
        ans_list = [form.ans1.data, form.ans2.data]
        ans_list.sort()
        if ans.answer1 == ans_list[0] and ans.answer2 == ans_list[1]:
            flash('Your answer is correct')
        else:
            flash('Your answer is incorrect')
        return redirect(url_for('main.display_questions'))
    return render_template('submit.html', form=form)
