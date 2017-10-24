import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StuPrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stu-pre',
  templateUrl: 'stu-pre.html',
})
export class StuPrePage {

  test: any;
  student:any;
  num:Array<any>;
  numRight:Array<any>;
  numWrong:Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.test = navParams.get('item');
    this.student = navParams.get('item2');
    this.num=[];
    this.numRight=[3,5,7,8];
    this.numWrong=[4,9,10];
    for(let i=0;i<20;i++){
      this.num.push(i);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StuPrePage');
    (<HTMLSpanElement>document.getElementById("wrong")).style.width="8%";
    (<HTMLSpanElement>document.getElementById("null")).style.width="4%";
    (<HTMLSpanElement>document.getElementById("right")).style.width="88%";

  }
  IsInArray(t:any,s:Array<any>):boolean{
     for(let i=0;i<s.length;i++){
       if(t==s[i]){
         return true;
       }
     }return false;
  }
}
