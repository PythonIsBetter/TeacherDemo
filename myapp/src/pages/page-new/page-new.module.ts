import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageNewPage } from './page-new';

@NgModule({
  declarations: [
    PageNewPage,
  ],
  imports: [
    IonicPageModule.forChild(PageNewPage),
  ],
})
export class PageNewPageModule {}
