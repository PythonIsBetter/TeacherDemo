import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublishNoticePage } from './publish-notice';

@NgModule({
  declarations: [
    PublishNoticePage,
  ],
  imports: [
    IonicPageModule.forChild(PublishNoticePage),
  ],
})
export class PublishNoticePageModule {}
