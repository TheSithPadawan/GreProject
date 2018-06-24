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
        if (res && res.access_token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: res.access_token}));
        }
      }));
  }

  register(username: string, password: string) {
    return this.http.post('http://127.0.0.1:5000/register', {username: username, password: password})
      .pipe(map((res:any) => {
        // login successful if there's a jwt token in the response
        if (res && res.access_token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: res.access_token}));
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('currentUser') === null);
  }

  public get currentUserName(): object {
    if(localStorage.getItem('currentUser') !== null) {
      let data = localStorage.getItem('currentUser');
      return JSON.parse(data);
    }
  }
}
