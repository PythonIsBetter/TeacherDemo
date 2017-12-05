import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeworkListPage } from './homework-list';

@NgModule({
  declarations: [
    HomeworkListPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeworkListPage),
  ],
})
export class HomeworkListPageModule {}
