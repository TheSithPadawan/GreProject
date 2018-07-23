import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from '../components/question/question.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { FavListComponent } from '../components/fav-list/fav-list.component';
import {ListItemComponent} from '../components/fav-list/list-item/list-item.component';
import {HistoryComponent} from '../components/history/history.component';
import {HistoryItemComponent} from '../components/history/history-item/history-item.component';
import {NoteComponent} from '../components/note/note.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'fav_list',
    component: FavListComponent
  },
  {
    path: 'question/:id',
    component: ListItemComponent
  },
  {
    path: 'myHistory',
    component: HistoryComponent
  },
  {
    path: 'myAns/:id',
    component: HistoryItemComponent
  },
  {
    path: 'myNotes',
    component: NoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
