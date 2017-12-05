import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-detailed-question',
  templateUrl: 'detailed-question.html',
})
export class DetailedQuestionPage
{
  id:number;//题号
  question:Array<{id:number,question:string,A:string,B:string,C:string,D:string,answer:string}>;//题目（题号+题目+选项+选项+选项+选项+答案）

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController)
  {
    this.id = navParams.get('id');//题号
    this.question=[];
    this.loadQuestion();
  }

  ionViewDidLoad() {console.log('ionViewDidLoad DetailedQuestionPage');}

  //加载选择题
  loadQuestion()
  {
    this.http.request("http://101.201.238.157/demo/index/getQuesDetail?titleid="+this.id).subscribe((res:Response)=>
    {
      if(this.id==1)
      {
        for(let i=0;i<res.json().data.length;i++)
        {
          this.question.push
          ({
            id:res.json().data[i].titleId,//题号
            question:res.json().data[i].titleBody,//题目
            A:"A、 "+res.json().data[i].A,//选项们
            B:"B、 "+res.json().data[i].B,
            C:"C、 "+res.json().data[i].C,
            D:"D、 "+res.json().data[i].D,
            answer:res.json().data[i].answer,//答案
          });
        }
      }
      else
      {
        for(let i=0;i<res.json().data.length;i++)
        {
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
      }

    });
  }

}
