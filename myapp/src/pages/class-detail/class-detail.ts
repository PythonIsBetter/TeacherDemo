import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StuManagePage} from "../stu-manage/stu-manage";

/**
 * Generated class for the ClassDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-class-detail',
  templateUrl: 'class-detail.html',
})
export class ClassDetailPage {

  selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassDetailPage');
  }
  itemTapped1(event, item) {
    this.navCtrl.push(StuManagePage, {
      item: item
    });
  }
}
