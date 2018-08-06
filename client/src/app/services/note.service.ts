import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': <string> this.auth.currentToken(),
    })
  };
  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }
  getUserNote(){
      return this.http.get('http://localhost:8152/note', this.httpOptions);
  }

  delNote(currNote) {
    return this.http.post('http://localhost:8152/note/delete', {'questionID': currNote.question.id}, this.httpOptions);
  }
}
