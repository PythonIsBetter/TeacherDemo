import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StuManagePage} from "../stu-manage/stu-manage";
import {PublishHomeworkPage} from "../publish-homework/publish-homework";

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
export class ClassDetailPage
{
  selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ClassDetailPage');
  }

  //学生管理
  itemTapped1(event, item)
  {
    this.navCtrl.push(StuManagePage,
      {
        item: item
      });
  }

  //发布作业
  publishHomework(event, item)
  {
    this.navCtrl.push(PublishHomeworkPage,
      {
        item:item
      });
  }
}
