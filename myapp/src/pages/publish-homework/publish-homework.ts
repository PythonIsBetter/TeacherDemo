import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SelectQuestionPage} from "../select-question/select-question";

//发布作业界面

@IonicPage()
@Component(
  {
  selector: 'page-publish-homework',
  templateUrl: 'publish-homework.html',
})
export class PublishHomeworkPage
{
  selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad PublishHomeworkPage');
  }

  //发布作业页面中，用户点了下一步后的跳转函数
  selectQuestion(event, item)
  {
    this.navCtrl.push(SelectQuestionPage,
      {
        item:item
      });
  }
}
