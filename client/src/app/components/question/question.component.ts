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
  ans = {
    'answer1': 'something',
    'answer2': 'something'
  }
  submitted = false;

  ngOnInit() {
    this.question.getOneQuestion().subscribe(
        (response: Response) => {
          this.data.id = response['id'];
          this.data.question = response['question'];
          // some transformation of the data
          for (let i = 0; i < response['options'].length; i++) {
            const pair = response['options'][i];
            for (const key in pair) {
              if (pair.hasOwnProperty(key)) {
                this.data.options.push(
                  {
                    label: key,
                    content: pair[key]
                  }
                );
              }
            }
          }
        }
    );
  }

  getAns(id) {
    this.question.getAnswer(id).subscribe(
      (response: Answer) => {
        this.ans.answer1 = response['answer1'];
        this.ans.answer2 = response['answer2'];
      }
    ,
      (error) => console.log(error),
      () => this.checkAns()
    );
  }
  onSubmit(question_id) {
    this.getAns(question_id);
    this.submitted = true;
  }
  checkAns() {
    if (this.usr_ans1 === this.ans.answer1 && this.usr_ans2 === this.ans.answer2) {
      this.status = 'correct answer';
    } else {
      this.status = 'incorrect answer';
    }
  }
}

export interface Answer {
  answer1: string;
  answer2: string;
}
