import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { QuestionService } from '../../services/question.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  data: Question;
  constructor(private question: QuestionService, private auth: AuthenticationService, public router: Router) {
    this.data = new Question();
  }
  ngOnInit() {
    this.question.getOneQuestion().subscribe(
        (response: Response) => {
          this.data.id = response['id'];
          this.data.question = response['question'];
          // some transformation of the data
          for (let i = 0; i < response['options'].length; i++) {
            const pair = response['options'][i];
            for (const key in pair) {
              if (pair.hasOwnProperty(key)) {
                this.data.options.push(
                  {
                    label: key,
                    content: pair[key]
                  }
                );
              }
            }
          }
        },
      (error) => console.log(error),
      () => this.data.submitted = false
    );
  }

  getAns(id) {
    this.question.getAnswer(id).subscribe(
      (response: Answer) => {
        // this.ans.answer1 = response['answer1'];
        // this.ans.answer2 = response['answer2'];
        this.data.ans = {
          'answer1': response['answer1'],
          'answer2': response['answer2']
        };
      }
    ,
      (error) => console.log(error),
      () => this.checkAns()
    );
  }
  onSubmit(question_id) {
    this.getAns(question_id);
    this.data.submitted = true;
  }

  checkAns() {
    if (this.data.usr_ans1 === this.data.ans['answer1'] && this.data.usr_ans2 === this.data.ans['answer2']) {
      this.data.status = 'correct answer';
    } else {
      this.data.status = 'incorrect answer';
    }
  }
  onSubscribe(question_id) {
    const token = this.auth.currentToken();
    if (token === null) {
      this.router.navigate(['./login']);
    } else {
      this.question.subscribeQuestion(question_id).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }
  onUnSubscribe(question_id) {
    const token = this.auth.currentToken();
    if (token === null) {
      this.router.navigate(['./login']);
    } else {
      this.question.unsubscribeQuestion(question_id).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }
}

export interface Answer {
  answer1: string;
  answer2: string;
}

export class Question {
  id: number;
  question: string;
  options: object[] = [];
  usr_ans1: string;
  usr_ans2: string;
  status: string;
  ans: object = {};
  submitted: boolean;
}
