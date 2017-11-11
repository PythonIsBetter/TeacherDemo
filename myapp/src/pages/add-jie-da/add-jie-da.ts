import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import {SelectQuestionPage} from "../select-question/select-question";

/**
 * Generated class for the AddJieDaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-jie-da',
  templateUrl: 'add-jie-da.html',
})
export class AddJieDaPage
{
  type: number;//题目类型
  examID: number;//知识点
  url: string;//链接
  count: number;//计数
  jd: Array<{ id: number, question: string, answer: string }>;//选择题（题号+题目+答案）
  jdChoose: Array<number> = [];
  checkBox: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController) {
    this.type = navParams.get('item');//题目类型
    this.examID = navParams.get('examID');//知识点
    this.jd = [];
    this.count = 0;
    this.loadJD();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTianKongPage');
  }

  loadJD() {
    this.url = "http://101.201.238.157/demo/index/getquesbyexamID?examid=" + this.examID + "& type=" + this.type;//用get方式获得数据
    this.http.request(this.url).subscribe((res: Response) => {
      for (let i = 0; i < res.json().data.length; i++)
      {
        this.jd.push
        ({
          id: res.json().data[i].titleId,//题号
          question: res.json().data[i].titleBody,//题目
          answer: res.json().data[i].answer,//答案
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
        this.jdChoose.push(i + 1);
      }
    }

    this.navCtrl.push(SelectQuestionPage,
      {
        jd: this.jdChoose
      });
  }
}