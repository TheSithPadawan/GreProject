import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class FavListService {

  constructor(private http: HttpClient) {
  }
  getFavList() {
    return this.http.get('http://localhost:4000/questions');
  }
}
