import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareFilePage } from './share-file';

@NgModule({
  declarations: [
    ShareFilePage,
  ],
  imports: [
    IonicPageModule.forChild(ShareFilePage),
  ],
})
export class ShareFilePageModule {}
