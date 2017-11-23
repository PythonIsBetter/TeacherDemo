import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuaDetailPage} from "../qua-detail/qua-detail";
import {Http, Response} from "@angular/http";

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
  homeworkID:any;
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

    this.getID();//获取ID

    this.ques=[];
    this.quesRight=[];
    this.quesWrong=[];
    this.urlQuesAll+="?homeName="+this.homework.name;
    this.urlQuesRight+="?stuid="+this.student.id+"&hid="+this.homeworkID;
    this.urlQuesWrong+="?stuid="+this.student.id+"&hid="+this.homeworkID;
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad StuPrePage');
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

  itemTapped(event, item,item2)
  {
    this.navCtrl.push(QuaDetailPage,
      {
      item: item,
      item2:item2
    });
  }

  //根据作业名称的到ID
  getID()
  {
    this.http.request("http://101.201.238.157/demo/index/getHomeworkState?name="+this.homework.name).subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.homeworkID= res.json().data[i].id;
      }
    });
  }
}
