import { Component, OnInit } from '@angular/core';
import { AllQuestionsService } from '../../services/allQuestions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-allQuestions',
  templateUrl: './allQuestions.component.html',
  styleUrls: ['./allQuestions.component.css']
})

export class AllQuestionsComponent implements OnInit {
  data$:  Object;

  constructor(private allQuestions: AllQuestionsService) { }

  ngOnInit() {
    this.allQuestions.getAllQuestions().subscribe(
      allQuestions=> this.data$ = allQuestions
    )
  }

}
