import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController} from 'ionic-angular';
import {createElementCssSelector} from "@angular/compiler";

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

  constructor(public viewCtrl: ViewController,public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeworkModifyPage');
  }
  submit(){
    if(this.homeworkName==null)
      alert("请填写作业名称");
    else
    {
      this.viewCtrl.dismiss(this.homeworkName);
      this.navCtrl.popToRoot();
    }
  }
  cancel(){
    this.viewCtrl.dismiss("cancel");
  }

}
