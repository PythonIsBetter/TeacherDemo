import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StuManagePage} from "../stu-manage/stu-manage";
import {PublishNoticePage} from "../publish-notice/publish-notice";
import {ShareFilePage} from "../share-file/share-file";
import {HomeworkListPage} from "../homework-list/homework-list";
import {ReportHomeworkPage} from "../report-homework/report-homework";
import {HomeworkDetailPage} from "../homework-detail/homework-detail";
import {OperateClassPage} from "../operate-class/operate-class";


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
    console.log(this.selectedItem);
    localStorage.setItem("subject",this.selectedItem.subject);
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
    this.navCtrl.push(HomeworkListPage,
      {
        item:item
      });
  }

  //发布通知
  publishNotice(event, item)
  {
    this.navCtrl.push(PublishNoticePage,
      {
        item:item
      });
  }

  //发布作业报告
  publishReport(event, item)
  {
    this.navCtrl.push(ReportHomeworkPage,
      {
        item:item
      });
  }

  //资料分享
  shareFile(event, item)
  {
    this.navCtrl.push(ShareFilePage,
      {
        item:item
      });
  }

  //作业详情
  homeworkDetail(event, item)
  {
    this.navCtrl.push(HomeworkDetailPage,
      {
        item:item
      });
  }

  operateClass(event, item)
  {
    this.navCtrl.push(OperateClassPage,
      {
        item:item
      });
  }
}
