import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {SelectQuestionPage} from "../select-question/select-question";

@IonicPage()
@Component({
  selector: 'page-add-xuan-ze',
  templateUrl: 'add-xuan-ze.html',
})
export class AddXuanZePage
{
  type:number;//题目类型
  examID:number;//知识点
  url:string;//链接
  count:number;//计数
  xz:Array<{id:number,question:string,A:string,B:string,C:string,D:string,answer}>;//选择题（题号+题目+选项+选项+选项+选项+答案）
  xzChoose:Array<number>=[];
  checkBox:any;
  homeworkName:string;
  everyQuestion: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController)
  {
    this.everyQuestion = navParams.get('everyQuestion');//获取每一题的实例
    this.type = navParams.get('item');//题目类型
    this.examID = this.everyQuestion.id;//知识点ID
    this.homeworkName=navParams.get('homeworkName');
    this.xz=[];
    this.count=0;
    this.loadXZ();
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad AddXuanZePage');
  }

  //加载选择题
  loadXZ()
  {
    this.url="http://101.201.238.157/demo/index/getquesbyexamID?examid="+this.examID+"& type="+this.type;//用get方式获得数据
    this.http.request(this.url).subscribe((res:Response)=>
      {
        for(let i=0;i<res.json().data.length;i++)
        {
          this.xz.push
          ({
              id:res.json().data[i].titleId,//题号
              question:res.json().data[i].titleBody,//题目
              A:res.json().data[i].A,//选项们
              B:res.json().data[i].B,
              C:res.json().data[i].C,
              D:res.json().data[i].D,
              answer:res.json().data[i].answer,//答案
          });
          this.count=i;
        }
      });
  }

  //添加题目
  add()
  {
    this.checkBox= document.getElementsByName("add");
    for(let i=0;i<=this.count;i++)
    {
      if(this.checkBox[i].checked)
      {
        this.xzChoose.push(i+1);
      }
    }

    for(let k=0;k<=this.xzChoose.length;k++)
    {
      this.http.get("http://101.201.238.157/demo/index/addHomeworkDetail?name="+ this.homeworkName+"&textid="+this.xzChoose.pop()).subscribe(res=>
      {
        if (res.json().data == "1")
        {
          // alert("创建成功");
          let toast = this.toastCtrl.create
          ({
            message: '通过成功',
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
        else
          {
          // alert("创建失败");
          let toast = this.toastCtrl.create
          ({
            message: '通过失败',
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      });
    }

    this.navCtrl.push(SelectQuestionPage,
      {
        everyQuestion:this.everyQuestion,
        homeworkName:this.homeworkName,
      });

  }

}