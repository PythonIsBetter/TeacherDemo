import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StuInfoPage } from './stu-info';

@NgModule({
  declarations: [
    StuInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(StuInfoPage),
  ],
})
export class StuInfoPageModule {}
