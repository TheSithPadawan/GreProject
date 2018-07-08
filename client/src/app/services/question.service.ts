import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  getOneQuestion() {
    return this.http.get('http://127.0.0.1:5000/one_question');
  }
  
  getAnswer(id) {
    return this.http.get('http://127.0.0.1:5000/answer/' + id);
  }
}
