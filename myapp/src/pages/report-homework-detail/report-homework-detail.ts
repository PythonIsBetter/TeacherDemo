import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Response} from "@angular/http";

/**
 * Generated class for the ReportHomeworkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-homework-detail',
  templateUrl: 'report-homework-detail.html',
})
export class ReportHomeworkDetailPage {
  urlGetStuHomeMessage: string;
  homeworkDetail:Array<{stuName:string,mark:string,wrongAnswer:string,submitLastTime:string}>;
  homework:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http) {
    this.homeworkDetail =[];
    this.homework = [];
    this.homework = this.navParams.get('item');
    this.urlGetStuHomeMessage = "http://101.201.238.157/demo/index/getStuHomeMessageByHomeId?homeid="
    this.urlGetStuHomeMessage += this.homework.id;
    this.http.request(this.urlGetStuHomeMessage).subscribe((res:Response)=>{
      for(let i=0;i<res.json().data.length;i++)
      {
        this.homeworkDetail.push({
          stuName: res.json().data[i].stuName,
          mark: res.json().data[i].mark,
          wrongAnswer: res.json().data[i].wrongAnswer,
        submitLastTime: res.json().data[i].submitLastTime,
        });
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportHomeworkDetailPage');
  }

}
