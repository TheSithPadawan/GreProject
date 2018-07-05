import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from '../components/question/question.component';
import { AllQuestionsComponent } from '../components/allQuestions/allQuestions.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';

const routes: Routes = [
  {
    path: 'oneQuestion',
    component: QuestionComponent
  },
  {
    path: 'allQuestions',
    component: AllQuestionsComponent
  }
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
