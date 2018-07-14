import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FavListService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': <string> this.auth.currentToken(),
    })
  };
  constructor(private http: HttpClient, private auth: AuthenticationService) {}
  getFavList() {
    return this.http.get('http://localhost:5000/myfav', this.httpOptions);
  }
}
