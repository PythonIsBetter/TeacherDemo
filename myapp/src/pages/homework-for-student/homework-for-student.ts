import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuaDetailPage} from "../qua-detail/qua-detail";
import {Http, Response} from "@angular/http";
import {StudentDoneHomeworkPage} from "../student-done-homework/student-done-homework";

@IonicPage()
@Component({
  selector: 'page-homework-for-student',
  templateUrl: 'homework-for-student.html',
})
export class HomeworkForStudentPage
{
  subItem: any;
  student:any;
  homework:any;
  num:any;
  numRight:any;
  numWrong:any;
  ques:Array<{titleid:String,examid:String}>;
  quesRight:Array<any>;
  quesWrong:Array<any>;
  urlQuesAll:string;
  urlQuesRight:string;
  urlQuesWrong:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http)
  {
    this.urlQuesAll="http://101.201.238.157/demo/index/getQuesByHomeworkName";
    this.urlQuesRight="http://101.201.238.157/demo/index/getHomeworkRight";
    this.urlQuesWrong="http://101.201.238.157/demo/index/getHomeworkWrong";
    this.subItem = navParams.get('item');
    this.student = navParams.get('item2');
    this.homework=this.navParams.get('homework');
    this.ques=[];
    this.quesRight=[];
    this.quesWrong=[];

  }

  ionViewDidLoad()
  {
    this.urlQuesAll+="?name="+this.homework.name;
    this.urlQuesRight+="?stuid="+this.student.id+"&hid="+this.homework.id;
    this.urlQuesWrong+="?stuid="+this.student.id+"&hid="+this.homework.id;

    this.http.request(this.urlQuesAll)
      .subscribe((res:Response)=>
      {
        this.num=res.json().data.length;

        for(let i=0;i<res.json().data.length;i++)
        {
          this.ques.push({
            titleid: res.json().data[i].titleId,
            examid:res.json().data[i].examId
          });
        }
      });

    this.http.request(this.urlQuesRight)
      .subscribe((res:Response)=>
      {
        this.numRight=res.json().data.length;
        for(let i=0;i<res.json().data.length;i++)
        {
          this.quesRight.push(res.json().data[i].titleId);
        }
      });

    this.http.request(this.urlQuesWrong)
      .subscribe((res:Response)=>
      {
        this.numWrong=res.json().data.length;
        for(let i=0;i<res.json().data.length;i++)
        {
          this.quesWrong.push(res.json().data[i].titleId);
        }
      });
  }

  ionViewDidEnter()
  {
    (<HTMLSpanElement>document.getElementById("wrong")).style.width=(this.numWrong* 100/this.num).toFixed(2) + "%";
    (<HTMLSpanElement>document.getElementById("null")).style.width=((this.num-this.numRight-this.numWrong)* 100/this.num).toFixed(2) + "%";
    (<HTMLSpanElement>document.getElementById("right")).style.width=(this.numRight* 100/this.num).toFixed(2) + "%";
  }

  IsInArray(t:any,s:Array<any>):boolean
  {
    for(let i=0;i<s.length;i++){
      if(t==s[i]){
        return true;
      }
    }return false;
  }

  itemTapped1(event, item)
  {
    this.navCtrl.push(QuaDetailPage,
      {
      item: item
    });
  }

  itemTapped(id)
  {
    this.navCtrl.push(StudentDoneHomeworkPage,
      {
        stuid: this.student.id,
        id:id
    });
  }
}
