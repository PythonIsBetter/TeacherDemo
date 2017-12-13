import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddStuPage } from './add-stu';

@NgModule({
  declarations: [
    AddStuPage,
  ],
  imports: [
    IonicPageModule.forChild(AddStuPage),
  ],
})
export class AddStuPageModule {}
