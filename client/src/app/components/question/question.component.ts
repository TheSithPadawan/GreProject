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
  data = {
    id: -1,
    question: '',
    options: [],
  };
  
  
  constructor(private question: QuestionService, private auth: AuthenticationService, public router: Router, private http: HttpClient) { }
  
  usr_ans1 = '';
  usr_ans2 = '';
  status = '';
  ans = {
    'answer1': 'something',
    'answer2': 'something'
  }
  submitted = false;

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
        }
    );
  }

  getAns(id) {
    this.question.getAnswer(id).subscribe(
      (response: Answer) => {
        this.ans.answer1 = response['answer1'];
        this.ans.answer2 = response['answer2'];
      }
    ,
      (error) => console.log(error),
      () => this.checkAns()
    );
  }
  onSubmit(question_id) {
    this.getAns(question_id);
    this.submitted = true;
  }
  
  checkAns() {
    if (this.usr_ans1 === this.ans.answer1 && this.usr_ans2 === this.ans.answer2) {
      this.status = 'correct answer';
    } else {
      this.status = 'incorrect answer';
    }
  }
  
  getToken(question_id, token_id){
    if(token_id !== null){
      return this.http.post('http://localhost:4200/fav_list', {question_id: question_id, token_id: token_id})
        .pipe(map((res:any) => {
          localStorage.setItem('fav_list', JSON.stringify({question_id: question_id, token_id: token_id}));
      }));
    }else{
      this.ngOnInit2();
    }
  }
  
  ngOnInit2() {
    this.router.navigate(['./login']);
  }
  
  onSubscribe(question_id, token_id){
    this.getToken(question_id, token_id);
    this.submitted = true;
  }
}

export interface Answer {
  answer1: string;
  answer2: string;
}