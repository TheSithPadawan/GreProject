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
    // todo: change this to the actual endpoints
    return this.http.get('http://localhost:5000/myfav');
  }
}
