import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuaDetailPage } from './qua-detail';

@NgModule({
  declarations: [
    QuaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QuaDetailPage),
  ],
})
export class QuaDetailPageModule {}
