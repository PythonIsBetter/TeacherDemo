import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Response} from "@angular/http";
import {ExercisePage} from "../exercise/exercise";

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
  homeworkDetail:Array<{uid:string,stuName:string,mark:string,wrongAnswer:string,submitLastTime:string}>;
  homework:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http) {
    this.homeworkDetail =[];
    this.homework = [];
    this.homework = this.navParams.get('item');
    this.urlGetStuHomeMessage = "http://101.201.238.157/demo/index/getStuHomeMessageByHomeId?homeid=";
    this.urlGetStuHomeMessage += this.homework.id;
    this.http.request(this.urlGetStuHomeMessage).subscribe((res:Response)=>{
      for(let i=0;i<res.json().data.length;i++)
      {
        this.homeworkDetail.push({
          uid: res.json().data[i].stuid,
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
    console.log(this.homework);
    console.log(this.homeworkDetail);

  }

  itemTapped(event,student){
    this.navCtrl.push(ExercisePage,{
      item:student,//主要用他的stuid
    });
  }

}
