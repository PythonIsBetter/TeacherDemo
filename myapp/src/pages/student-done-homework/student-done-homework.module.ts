import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentDoneHomeworkPage } from './student-done-homework';

@NgModule({
  declarations: [
    StudentDoneHomeworkPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentDoneHomeworkPage),
  ],
})
export class StudentDoneHomeworkPageModule {}
