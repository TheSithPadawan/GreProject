import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService} from '../../../services/question.service';
import {Answer, Question} from '../../question/question.component';
import { QuestionComponent } from '../../question/question.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  id: number;
  data: Question;
  constructor(private route: ActivatedRoute, private question: QuestionService) {
    this.data = new Question();
  }

  ngOnInit() {
    // subscribe to the route and get the parameter
    this.route.params.subscribe(params => {
      // convert string 'id' to a number dtype
      this.id = +params['id'];
    });
    this.question.getQuestionById(this.id).subscribe(
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
      },
      (error) => console.log(error),
      () => this.data.submitted = false
    );
  }
  getAns(id) {
    this.question.getAnswer(id).subscribe(
      (response: Answer) => {
        // this.ans.answer1 = response['answer1'];
        // this.ans.answer2 = response['answer2'];
        this.data.ans = {
          'answer1': response['answer1'],
          'answer2': response['answer2']
        };
      }
      ,
      (error) => console.log(error),
      () => this.checkAns()
    );
  }
  checkAns() {
    if (this.data.usr_ans1 === this.data.ans['answer1'] && this.data.usr_ans2 === this.data.ans['answer2']) {
      this.data.status = 'correct answer';
    } else {
      this.data.status = 'incorrect answer';
    }
  }
  onSubmit(question_id) {
    this.getAns(question_id);
    this.data.submitted = true;
  }

}
