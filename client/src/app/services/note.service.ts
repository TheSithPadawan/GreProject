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
  //GET NOTE
  getNotes(id, auth){
    return this.http.get('http://127.0.0.1:5000/notes/' + id + auth);  
  }
}
