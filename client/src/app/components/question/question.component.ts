import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  data = {
    id: -1,
    question: '',
    options: []
  };
  constructor(private question: QuestionService) { }
  usr_ans1 = '';
  usr_ans2 = '';
  status = '';
  ans: Answer;
  submitted = false;

  ngOnInit() {
    this.question.getOneQuestion().subscribe(
      question => {
        this.data.id = question['id'];
        this.data.question = question['question'];
        for (let i = 0; i < question['options'].length; i++) {
          const pair = question['options'][i];
          for (const key in pair) {
            if (pair.hasOwnProperty(key)) {
              this.data.options.push([key, pair[key]]);
            }
          }
        }
        this.getAns(question['id']);
      }
    );
  }
  getAns(id) {
    this.question.getAnswer(id).subscribe((response: Answer) => this.ans = {
      answer1: response['answer1'],
      answer2: response['answer2']
    });
  }
  onSubmit() {
    const result = this.checkAns();
    if (result) {
      this.status = 'correct answer';
    } else {
      this.status = 'incorrect answer';
    }
    this.submitted = true;
  }
  checkAns() {
    if (this.usr_ans1 === this.ans.answer1 && this.usr_ans2 === this.ans.answer2) {
      return true;
    }
    return false;
  }
}

export interface Answer {
  answer1: string;
  answer2: string;
}
