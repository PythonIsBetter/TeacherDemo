import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StuInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stu-info',
  templateUrl: 'stu-info.html',
})
export class StuInfoPage {
  stu:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stu = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StuInfoPage');
  }

}
