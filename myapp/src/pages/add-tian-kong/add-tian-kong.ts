import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import {SelectQuestionPage} from "../select-question/select-question";

@IonicPage()
@Component({
  selector: 'page-add-tian-kong',
  templateUrl: 'add-tian-kong.html',
})
export class AddTianKongPage
{
  type:number;//题目类型
  examID:number;//知识点
  url:string;//链接
  count:number;//计数
  tk:Array<{id:number,question:string,answer:string}>;//填空题（题号+题目+答案）
  tkChoose:Array<number>=[];
  homeworkName:string;
  everyQuestion: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController)
  {
    this.everyQuestion = navParams.get('everyQuestion');//获取每一题的实例
    this.type = navParams.get('item');//题目类型
    this.examID = this.everyQuestion.id;//知识点ID
    this.homeworkName=navParams.get('homeworkName');//作业名称
    this.tk = [];
    this.count = 0;
    this.loadTK();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTianKongPage');
  }

  loadTK()
  {
    this.url="http://47.100.203.126:81/index.php/demo/index/getquesbyexamID?examid="+this.examID+"& type="+this.type;//用get方式获得数据
    this.http.request(this.url).subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.tk.push
        ({
          id:res.json().data[i].titleId,//题号
          question:res.json().data[i].titleBody,//题目
          answer:res.json().data[i].answer,//答案
        });
        this.count=i;
      }
    });
  }

  //动态获取多选框的值
  changeTheValue(id)
  {
    this.tkChoose.push(id);
  }

  //添加题目
  add()
  {
    for(let k=0;k<this.tkChoose.length;k++)
    {
      this.http.get("http://47.100.203.126:81/index.php/demo/index/addHomeworkDetail?name="+ this.homeworkName+"&textid="+this.tkChoose[k]).subscribe(res=>
      {
        if (res.json().code != "200")
          alert("第 "+k+" 题添加失败");
      });
    }

    this.navCtrl.pop();
  }
}
