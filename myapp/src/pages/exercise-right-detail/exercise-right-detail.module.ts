import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciseRightDetailPage } from './exercise-right-detail';

@NgModule({
  declarations: [
    ExerciseRightDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExerciseRightDetailPage),
  ],
  exports: [
    ExerciseRightDetailPage
  ],
})
export class ExerciseRightDetailPageModule {}
