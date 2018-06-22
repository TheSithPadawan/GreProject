import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  data$:  Object;

  constructor(private question: QuestionService) { }

  ngOnInit() {
    this.question.getOneQuestion().subscribe(
      question=> this.data$ = question
    )
  }

}
