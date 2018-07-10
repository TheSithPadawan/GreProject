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

  register(username: string, password: string, email: string) {
    return this.http.post('http://127.0.0.1:5000/register', {username: username, password: password, email: email})
      .pipe(map((res:any) => {
        // register successful if there's a jwt token in the response
        if (res && res.access_token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: res.access_token}));
        }
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    // remove user from local storage to log user out
    return this.http.post('http://127.0.0.1:5000/logout', {})
      .pipe(map((res:any) => {
        // logout successful if there's a jwt token in the response
        console.log(res.message)
      }));
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('currentUser') === null);
  }

  public get currentUserName(): object {
    if (localStorage.getItem('currentUser') !== null) {
      let data = JSON.parse(localStorage.getItem('currentUser'));
      return data;
    }
  }

  // return token
  currentToken() {
    if(localStorage.getItem('currentUser') !== null) {
      const data = JSON.parse(localStorage.getItem('currentUser'));
      return data.token;
    } else {
      return null;
    }
  }
}
