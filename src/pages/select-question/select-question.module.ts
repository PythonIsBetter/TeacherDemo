import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectQuestionPage } from './select-question';

@NgModule({
  declarations: [
    SelectQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectQuestionPage),
  ],
})
export class SelectQuestionPageModule {}
