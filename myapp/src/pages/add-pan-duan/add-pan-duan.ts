import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import {SelectQuestionPage} from "../select-question/select-question";

/**
 * Generated class for the AddPanDuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-pan-duan',
  templateUrl: 'add-pan-duan.html',
})
export class AddPanDuanPage {
  type: number;//题目类型
  examID: number;//知识点
  url: string;//链接
  count: number;//计数
  pd: Array<{ id: number, question: string, answer: string }>;//选择题（题号+题目+答案）
  pdChoose: Array<number> = [];
  checkBox: any;
  homeworkName:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {
    this.type = navParams.get('item');//题目类型
    this.examID = navParams.get('examID');//知识点
    this.homeworkName=navParams.get('homeworkName');
    this.pd = [];
    this.count = 0;
    this.loadPD();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTianKongPage');
  }

  loadPD() {
    this.url = "http://101.201.238.157/demo/index/getquesbyexamID?examid=" + this.examID + "& type=" + this.type;//用get方式获得数据
    this.http.request(this.url).subscribe((res: Response) => {
      for (let i = 0; i < res.json().data.length; i++)
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
        this.count = i;
      }
    });
  }

  //添加题目
  add()
  {
    this.checkBox = document.getElementsByName("add");
    for (let i = 0; i <= this.count; i++)
    {
      if (this.checkBox[i].checked)
      {
        this.pdChoose.push(i + 1);
      }
    }

    for(let k=0;k<=this.pdChoose.length;k++)
    {
      this.http.get("http://101.201.238.157/demo/index/addHomeworkDetail?name="+ this.homeworkName+"&textid="+this.pdChoose.pop()).subscribe(res=>
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
        pd: this.pdChoose
      });
  }
}
