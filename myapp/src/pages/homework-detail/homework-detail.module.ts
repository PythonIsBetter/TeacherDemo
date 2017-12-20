import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeworkDetailPage } from './homework-detail';

@NgModule({
  declarations: [
    HomeworkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeworkDetailPage),
  ],
})
export class HomeworkDetailPageModule {}
