import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {AddXuanZePage} from "../add-xuan-ze/add-xuan-ze";
import {AddTianKongPage} from "../add-tian-kong/add-tian-kong";
import {AddPanDuanPage} from "../add-pan-duan/add-pan-duan";
import {AddJieDaPage} from "../add-jie-da/add-jie-da";
import {DetailedQuestionPage} from "../detailed-question/detailed-question";

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

  xz:Array<{id:number,question:string,A:string,B:string,C:string,D:string,answer}>;//选择题（题号+题目+选项+选项+选项+选项+答案）
  tk:Array<{id:number,question:string,answer:string}>;//选择题（题号+题目+答案）
  pd: Array<{ id: number, question: string, answer: string }>;//选择题（题号+题目+答案）
  jd: Array<{ id: number, question: string, answer: string }>;//选择题（题号+题目+答案）
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController)
  {
    this.everyQuestion = navParams.get('everyQuestion');//获取每一题的实例
    this.homeworkName=navParams.get('homeworkName');
    this.xz=[];
    this.tk=[];
    this.pd=[];
    this.jd=[];
    this.loadTheHomework();
    alert("尊敬的用户您好！当您添加完成题目后，系统会自动保存这些题目，退出后下一次打开还可以继续编辑；" +
      "若您点了“发布”按钮之后，则系统会将题目发布出去，并且不再允许修改题目。请您悉知")

    this.http.request("http://101.201.238.157/demo/index/getHomeworkState?name="+this.homeworkName).subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.check= res.json().data[i].ispublished;
      }
    });

  }

  ionViewDidLoad( item )
  {
    console.log('ionViewDidLoad SelectQuestionPage');
    if(this.check==0) //未发布过的，开放编辑
      this.edit(item);
  }

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
    this.http.request("http://101.201.238.157/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=1").subscribe((res:Response)=>
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
      }
    });

    //添加填空题
    this.http.request("http://101.201.238.157/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=2").subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.tk.push
        ({
          id:res.json().data[i].titleId,//题号
          question:res.json().data[i].titleBody,//题目
          answer:res.json().data[i].answer,//答案
        });
      }
    });

    //添加判断题
    this.http.request("http://101.201.238.157/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=3").subscribe((res:Response)=>
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
          id: res.json().data[i].titleId,//题号
          question: res.json().data[i].titleBody,//题目
          answer: st,//答案
        });
      }
    });

    //添加解答题
    this.http.request("http://101.201.238.157/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=4").subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.jd.push
        ({
          id: res.json().data[i].titleId,//题号
          question: res.json().data[i].titleBody,//题目
          answer: res.json().data[i].answer,//答案
        });
      }
    });
  }

  //点击题目序号之后显示题目详情
  showDetailedQuestion(id)
  {
    this.navCtrl.push(
      DetailedQuestionPage,
      {
       id:id,
      });
  }

  //发布作业
  publishHomeWork()
  {
    this.http.get("http://101.201.238.157/demo/index/publishHomework?name="+this.homeworkName).subscribe(res=>
    {
      if (res.json().data == "1")
      {
        let toast = this.toastCtrl.create
        ({
          message: '发布成功',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      else
      {
        let toast = this.toastCtrl.create
        ({
          message: '发布失败',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    });
  }
}
