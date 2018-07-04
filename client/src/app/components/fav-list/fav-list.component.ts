import { Component, OnInit } from '@angular/core';
import { FavListService} from '../../services/fav_list.service';
import {ListItem} from './listItem';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.css']
})
export class FavListComponent implements OnInit {
  listItems: ListItem[] = []
  constructor(private favList: FavListService) { }

  ngOnInit() {
    this.favList.getFavList().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
