import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post('http://127.0.0.1:5000/login', {username: username, password: password})
      .pipe(map((res:any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username, token: res.token}));
        }
      }));
  }

  register(username: string, password: string) {
    return this.http.post('http://127.0.0.1:5000/register', {username: username, password: password})
      .pipe(map((res:any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username, token: res.token}));
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
