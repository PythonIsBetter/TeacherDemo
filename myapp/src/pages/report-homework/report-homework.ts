import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Response} from "@angular/http";
import {ReportHomeworkDetailPage} from "../report-homework-detail/report-homework-detail";

/**
 * Generated class for the ReportHomeworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-homework',
  templateUrl: 'report-homework.html',
})
export class ReportHomeworkPage {
  urlGetHomeworkList:string;
  //classes:Array<{id:String,name:String,subject:String,head:String,cid:String}>;
  classes:any;
  hid:any;
  subject:any;
  homework:Array<{id:string,name:string}>;


  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http) {
    this.classes = [];
    this.homework = [];
    this.urlGetHomeworkList = "http://47.100.203.126:81/index.php/demo/index/getHomeworkList?classid=";
    this.classes = navParams.get('item');
    this.subject = this.classes.subject;
    console.log(this.classes);
    this.urlGetHomeworkList += this.classes.id;

    this.http.request(this.urlGetHomeworkList)
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().data.length;i++)
        {
          this.homework.push({
            id:res.json().data[i].id,
            name:res.json().data[i].name
          });
        }
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportHomeworkPage');

  }

  showDetail(event,item){
    this.navCtrl.push(ReportHomeworkDetailPage,{
      homework: item,
      subject: this.subject
    });
  }

}
