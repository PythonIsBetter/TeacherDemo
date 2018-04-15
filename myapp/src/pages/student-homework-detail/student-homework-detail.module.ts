import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentHomeworkDetailPage } from './student-homework-detail';

@NgModule({
  declarations: [
    StudentHomeworkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentHomeworkDetailPage),
  ],
})
export class StudentHomeworkDetailPageModule {}
