import { Component, OnInit, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

@Injectable()

export class QuestionComponent implements OnInit {
  data = {
    id: -1,
    question: '',
    options: [],
    token: -1
  };
  
  constructor(private question: QuestionService, private router: Router, private http: HttpClient) { }
  
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
  
  private tokenKey:string = 'app_token';
  
//  private store(content:Object) {
//      localStorage.setItem(this.tokenKey, JSON.stringify(content));
//  }

  private retrieve() {
      let storedToken:string = localStorage.getItem(this.tokenKey);
      if(!storedToken){
        this.router.navigate(['/login'], { queryParams: { returnUrl: 'http://127.0.0.1:5000/login' }});
      }
      return storedToken;
  }

//  public generateNewToken() {
//      let token:string = '...';//custom token generation;
//      let currentTime:number = (new Date()).getTime() + ttl;
//      this.store({ttl: currentTime, token});
//  }

  public retrieveToken() {
      let currentTime:number = (new Date()).getTime(), token = null;
      try {
          let storedToken = JSON.parse(this.retrieve());
          if(storedToken.ttl < currentTime) throw 'invalid token found';
          token = storedToken.token;
      }
      catch(err) {
          console.error(err);
      }
      return token;
  }   

  onSubscribe(question_id, token) {
    this.getAns(question_id);
    this.retrieveToken();
    this.submitted = true;
  }
  
  subscribe(question_id: string, token: string) {
    return this.http.post('http://127.0.0.1:5000/fav_list', {question_id: question_id, token: token})
      .pipe(map((res:any) => {
        // login successful if there's a jwt token in the response
        if (res && res.access_token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({question_id: question_id, token: res.access_token}));
        }
    }));
}

export interface Answer {
  answer1: string;
  answer2: string;
}
