import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {AddXuanZePage} from "../add-xuan-ze/add-xuan-ze";
import {AddTianKongPage} from "../add-tian-kong/add-tian-kong";
import {AddPanDuanPage} from "../add-pan-duan/add-pan-duan";
import {AddJieDaPage} from "../add-jie-da/add-jie-da";
import {DetailedQuestionPage} from "../detailed-question/detailed-question";
import {MultiplePublishPage} from "../multiple-publish/multiple-publish";
import {HomePage} from "../home/home";
import {HomeworkModifyPage} from "../homework-list/homework-modify";

@IonicPage()
@Component({
  selector: 'page-select-question',
  templateUrl: 'select-question.html',
})
export class SelectQuestionPage
{
  everyQuestion: any;
  homeworkName:string;
  check:number;

  xz:Array<{id:number,titleID:number,question:string,A:string,B:string,C:string,D:string,answer}>;//选择题（序号+题号+题目+选项+选项+选项+选项+答案）
  tk:Array<{id:number,titleID:number,question:string,answer:string}>;//填空题（序号+题号+题目+答案）
  pd: Array<{id:number,titleID:number, question: string, answer: string }>;//判断题（序号+题号+题目+答案）
  jd: Array<{id:number,titleID:number, question: string, answer: string }>;//解答题（序号+题号+题目+答案）
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController,public modalCtrl: ModalController)
  {
    this.everyQuestion = navParams.get('everyQuestion');//获取每一题的实例
    this.homeworkName=navParams.get('homeworkName');
    this.xz=[];
    this.tk=[];
    this.pd=[];
    this.jd=[];

    this.loadTheHomework();

    this.http.request("http://47.100.203.126:81/index.php/demo/index/getHomeworkState?name="+this.homeworkName).subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.check= res.json().data[i].ispublished;
      }
    });
  }

  ionViewDidEnter ( item )
  {
    console.log('ionViewDidLoad SelectQuestionPage');
    if(this.check==0) //未发布过的，开放编辑
      this.edit(item);

    // this.loadTheHomework();
  }

  // ionViewWillEnter()
  // {
  //   this.loadTheHomework();
  // }

  // ionViewWillEnter()
  // {
  //   this.navCtrl.pop();
  //   this.navCtrl.push(SelectQuestionPage);
  // }

  edit(item)
  {
    //item是题目的类型（1234）
    switch(item)
    {
      case 1://选择题
       this.navCtrl.push(AddXuanZePage, {item:item, homeworkName:this.homeworkName, everyQuestion:this.everyQuestion});
        break;
      case 2://填空题
        this.navCtrl.push(AddTianKongPage, {item:item, homeworkName:this.homeworkName, everyQuestion:this.everyQuestion});
        break;
      case 3://判断题
        this.navCtrl.push(AddPanDuanPage, {item:item, homeworkName:this.homeworkName, everyQuestion:this.everyQuestion});
        break;
      case 4://解答题
        this.navCtrl.push(AddJieDaPage, {item:item, homeworkName:this.homeworkName, everyQuestion:this.everyQuestion});
        break;
    }
  }

  //加载当前选中的作业已有的题目
  loadTheHomework()
  {
    //添加选择题
    this.http.request("http://47.100.203.126:81/index.php/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=1").subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.xz.push
        ({
          id:i+1,
          titleID:res.json().data[i].titleId,//题号
          question:res.json().data[i].titleBody,//题目
          A:res.json().data[i].A,//选项们
          B:res.json().data[i].B,
          C:res.json().data[i].C,
          D:res.json().data[i].D,
          answer:res.json().data[i].answer,//答案
        });
      }
    });

    //添加填空题
    this.http.request("http://47.100.203.126:81/index.php/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=2").subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.tk.push
        ({
          id:i+1,
          titleID:res.json().data[i].titleId,//题号
          question:res.json().data[i].titleBody,//题目
          answer:res.json().data[i].answer,//答案
        });
      }
    });

    //添加判断题
    this.http.request("http://47.100.203.126:81/index.php/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=3").subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        let st= res.json().data[i].answer;
        if(res.json().data[i].answer=="1")
          st="正确";
        else
          st="错误";
        this.pd.push
        ({
          id:i+1,
          titleID:res.json().data[i].titleId,//题号
          question: res.json().data[i].titleBody,//题目
          answer: st,//答案
        });
      }
    });

    //添加解答题
    this.http.request("http://47.100.203.126:81/index.php/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=4").subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.jd.push
        ({
          id:i+1,
          titleID:res.json().data[i].titleId,//题号
          question: res.json().data[i].titleBody,//题目
          answer: res.json().data[i].answer,//答案
        });
      }
    });
  }

  //点击题目序号之后显示题目详情
  showDetailedQuestion(titleID,id)
  {
    this.navCtrl.push(
      DetailedQuestionPage,
      {
        titleID:titleID,
        id:id
      });
  }

  //发布作业
  publishHomeWork()
  {
    this.navCtrl.push(MultiplePublishPage,
      {
        type:0,
        homeworkName:this.homeworkName,
      });
  }

  //删除作业
  deleteHomework()
  {

    this.http.request("http://47.100.203.126:81/index.php/demo/index/deleteHomework?name="+this.homeworkName).subscribe((res:Response)=> {});
    this.navCtrl.popAll();
  }
}
