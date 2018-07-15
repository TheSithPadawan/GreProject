import { Component, OnInit, Input } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { HistoryItem } from './history-item/history-item.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  map: IdToHistoryItem = {};
  historyItems: HistoryItem[] = [];
  constructor(private history: HistoryService) { }

  ngOnInit() {
    this.history.getUserHistory().subscribe(
      (response: any[]) => {
        console.log(response);
        for (let i = 0; i < response.length; i++){
          const item = new HistoryItem();
          item.time = response[i]['time submitted'];
          item.question_id = response[i]['question id'];
          item.status = response[i]['status'];
          this.map[+item.question_id] = item;
          this.historyItems.push(item);
        }
      },
      (error) => console.log(error),
    () => console.log(this.historyItems)
    );
  }
}

interface IdToHistoryItem {
  [id: number]: HistoryItem;
}
