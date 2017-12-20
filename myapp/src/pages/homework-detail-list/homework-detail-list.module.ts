import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeworkDetailListPage } from './homework-detail-list';

@NgModule({
  declarations: [
    HomeworkDetailListPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeworkDetailListPage),
  ],
})
export class HomeworkDetailListPageModule {}
