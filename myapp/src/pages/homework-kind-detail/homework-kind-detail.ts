import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomeworkDetailListPage} from "../homework-detail-list/homework-detail-list";


/**
 * 上一个页面：homeworkDetail
 * 作业列表页面点进去后，显示“选择题”、“填空题”的界面
 * 下一个界面：homeworkDetailList
 * */

@IonicPage()
@Component({
  selector: 'page-homework-kind-detail',
  templateUrl: 'homework-kind-detail.html',
})
export class HomeworkKindDetailPage
{
  id:string;
  name:string;

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.id = navParams.get('id');
    this.name = navParams.get('name');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad HomeworkKindDetailPage');
  }

  //选择好类型后跳转到对应类型的题目里
  showTheDetail(type)
  {
    this.navCtrl.push(HomeworkDetailListPage,
      {
        id: this.id,
        name:this.name,
        type:type
      });
  }

}
