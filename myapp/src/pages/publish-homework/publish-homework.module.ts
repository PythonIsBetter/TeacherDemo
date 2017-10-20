import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublishHomeworkPage } from './publish-homework';

@NgModule({
  declarations: [
    PublishHomeworkPage,
  ],
  imports: [
    IonicPageModule.forChild(PublishHomeworkPage),
  ],
})
export class PublishHomeworkPageModule {}
