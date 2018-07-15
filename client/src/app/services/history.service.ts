import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': <string> this.auth.currentToken(),
    })
  };
  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }
  getUserHistory() {
    // todo: change this to the actual endpoints
    return this.http.get('http://localhost:3000/history', this.httpOptions);
  }
  getUserAnsByID(id) {
    // todo: change this to the actual endpoints
    return this.http.get('http://localhost:4000/answer/' + id, this.httpOptions);
  }
}
