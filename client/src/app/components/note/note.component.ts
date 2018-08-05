import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../services/note.service';
import {Question} from '../question/question.component';
import {Answer} from '../question/question.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  allNotes: Note[] = [];
  constructor(private note: NoteService) { }

  ngOnInit() {
    this.note.getUserNote().subscribe(
      (response: any[]) => {
        console.log(response);
        for (let t = 0; t < response.length; t++) {
          const oneNote = new Note();
          const q = new Question();
          q.id = response[t]['question_id'];
          q.question = response[t]['question'];
          // some transformation of the data
          for (let i = 0; i < response[t]['options'].length; i++) {
            const pair = response[t]['options'][i];
            for (const key in pair) {
              if (pair.hasOwnProperty(key)) {
                q.options.push(
                  {
                    label: key,
                    content: pair[key]
                  }
                );
              }
            }
          }
          q.usr_ans1 = response[t]['user_answer'][0];
          q.usr_ans2 = response[t]['user_answer'][1];
          oneNote.question = q;
          oneNote.answer = new Answer();
          oneNote.answer.answer1 = response[t]['answer'][0];
          oneNote.answer.answer2 = response[t]['answer'][1];
          oneNote.notes = response[t]['notes'];
          this.allNotes.push(oneNote);
        }
      },
      (error) => console.log(error),
      () => console.log(this.allNotes)
    );
  }
}

export class Note {
  question: Question;
  notes: string;
  answer: Answer;
}
