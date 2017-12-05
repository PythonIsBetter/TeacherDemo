import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeworkForStudentPage } from './homework-for-student';

@NgModule({
  declarations: [
    HomeworkForStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeworkForStudentPage),
  ],
})
export class HomeworkForStudentPageModule {}
