import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Response} from "@angular/http";
import {ReportHomeworkDetailPage} from "../report-homework-detail/report-homework-detail";
import {HomeworkKindDetailPage} from "../homework-kind-detail/homework-kind-detail";


/**
 * 上一个页面：classDetail
 * 作业详情页面点进去后，显示“作业一”、“作业二”的界面
 * 下一个界面：homeworkKindDetail
 * */

@IonicPage()
@Component({
  selector: 'page-homework-detail',
  templateUrl: 'homework-detail.html',
})
export class HomeworkDetailPage
{
  homeworkID:string;
  classes:any;
  homework:Array<{id:string,name:string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http)
  {
    this.classes = [];
    this.homework = [];
    this.classes = navParams.get('item');
    this.homeworkID=this.classes.id;

    this.http.request("http://101.201.238.157/demo/index/getHomeworkList?classid="+this.homeworkID).subscribe((res:Response)=>
      {
        for(let i=0;i<res.json().data.length;i++)
        {
          this.homework.push
          ({
            id:res.json().data[i].id,
            name:res.json().data[i].name
          });
        }
      });
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ReportHomeworkPage');
  }

  showDetail(id,name)
  {
    this.navCtrl.push(HomeworkKindDetailPage,
      {
        id: id,
        name:name
    });
  }
}

