import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeworkModifyPage } from './homework-modify';

@NgModule({
  declarations: [
    HomeworkModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeworkModifyPage),
  ],
})
export class HomeworkModifyPageModule {}
