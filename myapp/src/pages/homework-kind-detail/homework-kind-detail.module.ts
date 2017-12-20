import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeworkKindDetailPage } from './homework-kind-detail';

@NgModule({
  declarations: [
    HomeworkKindDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeworkKindDetailPage),
  ],
})
export class HomeworkKindDetailPageModule {}
