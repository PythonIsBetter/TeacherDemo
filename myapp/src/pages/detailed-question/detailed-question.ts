import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {MultiplePublishPage} from "../multiple-publish/multiple-publish";
import {SelectQuestionPage} from "../select-question/select-question";

@IonicPage()
@Component({
  selector: 'page-detailed-question',
  templateUrl: 'detailed-question.html',
})
export class DetailedQuestionPage
{
  id:number;//序号
  titleID:number;//题号
  homeworkName:string;//作业名称
  everyQuestion:any;
  question:Array<{id:number,question:string,A:string,B:string,C:string,D:string,answer:string}>;//题目（题号+题目+选项+选项+选项+选项+答案）
  kind:number;//题目类型

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController)
  {
    this.id = navParams.get('id');//题号
    this.titleID=navParams.get('titleID');
    this.homeworkName=navParams.get('homeworkName');//作业名称
    this.everyQuestion=navParams.get('everyQuestion');
    this.kind=0;
    this.question=[];
    this.loadQuestion();
  }

  ionViewDidLoad() {console.log('ionViewDidLoad DetailedQuestionPage');}

  //加载题目详情
  loadQuestion()
  {
    this.http.request("http://47.100.203.126:81/index.php/demo/index/getQuesDetail?titleid="+this.titleID).subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        //选择题
        if(res.json().data[i].type==1)
        {
          this.question.push
          ({
            id:res.json().data[i].titleId,//题号
            question:res.json().data[i].titleBody,//题目
            A:res.json().data[i].A,//选项们
            B:res.json().data[i].B,
            C:res.json().data[i].C,
            D:res.json().data[i].D,
            answer:res.json().data[i].answer,//答案
          });
          this.kind=1;
        }

        //非选择题
        else
          this.question.push
          ({
            id:res.json().data[i].titleId,//题号
            question:res.json().data[i].titleBody,//题目
            A:"",//选项们
            B:"",
            C:"",
            D:"",
            answer:res.json().data[i].answer,//答案
          });
      }
    });
  }

  //删除作业
  deleteHomework()
  {
    this.http.request("http://47.100.203.126:81/index.php/demo/index/deleteHomeworkDetail?name="+this.homeworkName+"&textid="+ this.titleID).subscribe((res:Response)=> {});
    this.navCtrl.pop();
    this.navCtrl.pop();
    this.navCtrl.push(SelectQuestionPage,
      {
        everyQuestion: this.everyQuestion,//每一到道题目
        homeworkName:this.homeworkName
      });
  }

}
