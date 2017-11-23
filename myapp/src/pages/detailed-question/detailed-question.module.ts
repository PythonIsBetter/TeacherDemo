import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedQuestionPage } from './detailed-question';

@NgModule({
  declarations: [
    DetailedQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailedQuestionPage),
  ],
})
export class DetailedQuestionPageModule {}
