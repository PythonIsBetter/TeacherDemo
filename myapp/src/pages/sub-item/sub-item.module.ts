import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubItemPage } from './sub-item';

@NgModule({
  declarations: [
    SubItemPage,
  ],
  imports: [
    IonicPageModule.forChild(SubItemPage),
  ],
})
export class SubItemPageModule {}
