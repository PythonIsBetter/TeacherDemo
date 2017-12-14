import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportHomeworkDetailPage } from './report-homework-detail';

@NgModule({
  declarations: [
    ReportHomeworkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportHomeworkDetailPage),
  ],
})
export class ReportHomeworkDetailPageModule {}
