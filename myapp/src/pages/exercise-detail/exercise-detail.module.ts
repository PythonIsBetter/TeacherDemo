import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciseDetailPage } from './exercise-detail';

@NgModule({
  declarations: [
    ExerciseDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExerciseDetailPage),
  ],
  exports: [
    ExerciseDetailPage
  ],
})
export class ExerciseDetailPageModule {}
