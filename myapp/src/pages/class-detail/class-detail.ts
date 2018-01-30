import { Component } from '@angular/core';
import {Http,Response}from "@angular/http";
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
  classInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http)
  {
    this.classInfo = navParams.get('classInfo');

  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ClassDetailPage');
  }

  //学生管理
  itemTapped1(item)
  {
    this.navCtrl.push(StuManagePage,
      {
        classInfo: item,//传班级信息过去
      });
  }

  //发布作业
  publishHomework(item)
  {
    this.navCtrl.push(HomeworkListPage,
      {
        classInfo:item,
      });
  }

  //发布通知
  publishNotice(item)
  {
    this.navCtrl.push(PublishNoticePage,
      {
        item:item
      });
  }

  //发布作业报告
  publishReport(item)
  {
    this.navCtrl.push(ReportHomeworkPage,
      {
        item:item
      });
  }

  //资料分享
  shareFile(item)
  {
    this.navCtrl.push(ShareFilePage,
      {
        item:item
      });
  }

  //作业详情
  homeworkDetail(item)
  {
    this.navCtrl.push(HomeworkDetailPage,
      {
        item:item
      });
  }

  operateClass(item)
  {
    this.navCtrl.push(OperateClassPage,
      {
        classInfo:item,//传ｃｌａｓｓInfo
      });
  }
}
