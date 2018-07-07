import { Component, OnInit } from '@angular/core';
import { FavListService} from '../../services/fav_list.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.css']
})
export class FavListComponent implements OnInit {
  items: Item[] = [];
  constructor(private favList: FavListService) { }

  // subscribe to Observable and store in the list items
  ngOnInit() {
    this.favList.getFavList().subscribe(
      (response: any[]) => {
        for (let i = 0; i < response.length; i++){
          const tmp = new Item();
          tmp.id = response[i]['id'];
          tmp.question = response[i]['question'];
          for (let j = 0; j < response[i]['options'].length; j++) {
            const pair = response[i]['options'][j];
            for (const key in pair) {
              if (pair.hasOwnProperty(key)) {
                  tmp.options.push(
                  {
                    label: key,
                    content: pair[key]
                  }
                );
              }
            }
          }
          tmp.usr_ans = response[i]['user_ans'];
          tmp.correct_ans = response[i]['correct_ans'];
          this.items.push(tmp);
        }
      },
      (error) => console.log(error),
      () => console.log(this.items)
    );
  }
}

// define data structure for one item
class Item {
  id: number;
  question: string;
  options: Object[] = [];
  usr_ans: string[] = [];
  correct_ans: string[] = [];
}
