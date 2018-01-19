import {Component} from '@angular/core';
import { IonicPage,ViewController} from 'ionic-angular';

/**
 * Generated class for the HomeworkModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homework-modify',
  templateUrl: 'homework-modify.html',
})
export class HomeworkModifyPage {
  homeworkName :String;

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeworkModifyPage');
  }
  submit(){
    this.viewCtrl.dismiss(this.homeworkName);
  }
  cancel(){
    this.viewCtrl.dismiss("cancel");
  }

}