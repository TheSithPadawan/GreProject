import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': <string> this.auth.currentToken(),
    })
  };
  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  getOneQuestion() {
    return this.http.get('http://127.0.0.1:5000/one_question');
  }

  getAnswer(id) {
    return this.http.get('http://127.0.0.1:5000/answer/' + id);
  }

  submitAnswer(id, ans1, ans2) {
    if (this.auth.currentToken() == null) {
      return this.http.post('http://127.0.0.1:5000/answer/' + id, {'usr_ans1': ans1, 'usr_ans2': ans2});
    }
    return this.http.post('http://127.0.0.1:5000/answer/' + id, {'usr_ans1': ans1, 'usr_ans2': ans2}, this.httpOptions);
  }

  subscribeQuestion(id) {
    //console.log("Subscribed!");
    return this.http.post('http://127.0.0.1:5000/subscribe', {'questionID': id}, this.httpOptions);
  }

  unsubscribeQuestion(id) {
    return this.http.post('http://127.0.0.1:5000/unsubscribe', {'questionID': id}, this.httpOptions);
  }

  //POST NOTE
  submitNote(id, notes) {
    return this.http.post('http://127.0.0.1:5000/note/add', {'questionID': id, 'note': notes}, this.httpOptions);
  }

  getQuestionById(id){
    return this.http.get('http://127.0.0.1:5000/one_question/' + id);
  }
}
