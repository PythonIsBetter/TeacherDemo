import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassDetailPage } from './class-detail';

@NgModule({
  declarations: [
    ClassDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassDetailPage),
  ],
})
export class ClassDetailPageModule {}
