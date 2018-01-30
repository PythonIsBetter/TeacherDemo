import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {HomeworkResultPage} from "../homework-result/homework-result";

/**
 * 上一个页面：homeworkKindDetail
 * 作业类型页面点进去后，显示题号的界面
 * 下一个界面：homeworkResult
 * */

@IonicPage()
@Component({
  selector: 'page-homework-detail-list',
  templateUrl: 'homework-detail-list.html',
})
export class HomeworkDetailListPage
{
  id:string;
  name:string;
  type:string;
  question:Array<{id:number,titleID:number}>;//题目（序号+题号）

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController)
  {
    this.id = navParams.get('id');
    this.name = navParams.get('name');
    this.type = navParams.get('type');
    this.question=[];

    this.http.request("http://101.201.238.157/demo/index/getQuesByHomeidType?homeid="+this.id+"&typeid="+this.type).subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.question.push
        ({
          id:i+1,
          titleID:res.json().data[i].titleId,//题号
        });
      }
    });
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad HomeworkDetailListPage');
  }

  //跳转到结果界面
  showTheResult(titleID)
  {
    this.navCtrl.push(HomeworkResultPage,
      {
        id: this.id,//作业号
        titleID:titleID//选择的题号
      });
  }
}
