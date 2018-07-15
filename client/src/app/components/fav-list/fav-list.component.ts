import { Component, OnInit } from '@angular/core';
import { FavListService} from '../../services/fav_list.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.css']
})
export class FavListComponent implements OnInit {
  questions: string[] = [];
  constructor(private favList: FavListService) { }

  // subscribe to Observable and store in the list items
  ngOnInit() {
    this.favList.getFavList().subscribe(
      (response: string[]) => {
        console.log(response);
        for (let i = 0; i < response.length; i++){
          this.questions.push(response[i]);
        }
      },
      (error) => console.log(error),
      () => console.log(this.questions)
    );
  }
}

