import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StuManagePage } from './stu-manage';

@NgModule({
  declarations: [
    StuManagePage,
  ],
  imports: [
    IonicPageModule.forChild(StuManagePage),
  ],
})
export class StuManagePageModule {}
