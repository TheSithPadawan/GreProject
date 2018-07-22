import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HistoryService} from '../../../services/history.service';
@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent implements OnInit {
  id: number;
  usr_ans: string [] = [];
  constructor(private route: ActivatedRoute, private history: HistoryService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // convert string 'id' to a number dtype
      this.id = +params['id'];
    });
    this.history.getUserAnsByID(this.id).subscribe(
      (response: any[]) => {
        this.usr_ans = response['usr_ans'];
      },
      (error) => console.log(error)
    );
  }

}


export class HistoryItem {
  time: string;
  question_id: string;
  status: string;
}
