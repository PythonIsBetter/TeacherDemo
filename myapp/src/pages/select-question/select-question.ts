import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {AddXuanZePage} from "../add-xuan-ze/add-xuan-ze";
import {AddTianKongPage} from "../add-tian-kong/add-tian-kong";
import {AddPanDuanPage} from "../add-pan-duan/add-pan-duan";
import {AddJieDaPage} from "../add-jie-da/add-jie-da";

/**
 * Generated class for the SelectQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-question',
  templateUrl: 'select-question.html',
})
export class SelectQuestionPage
{
  selectedItem: any;
  homeName: any;
  url:string;
  examID:number;
  homeworkName:string;

  xz:Array<number>=[];//选择题题号
  tk:Array<number>=[];//填空题题号
  pd:Array<number>=[]//判断题题号
  jd:Array<number>=[]//解答题题号
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController)
  {
    this.selectedItem = navParams.get('item');
    this.homeName = navParams.get('item2');
    this.examID=this.selectedItem.id;
    // this.xz=navParams.get('xz');
    // this.tk=navParams.get('tk');
    // this.pd=navParams.get('pd');
    // this.jd=navParams.get('jd');
    this.homeworkName=navParams.get('homeworkName');
    this.url="http://101.201.238.157/demo/index/getquesbyexamID";
    this.loadTheHomework();
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad SelectQuestionPage');
  }

  edit(item)
  {
    switch(item)
    {
      case 1://选择题
        this.navCtrl.push(AddXuanZePage, {item:item,examID:this.examID,homeworkName:this.homeworkName});
        break;
      case 2://填空题
        this.navCtrl.push(AddTianKongPage, {item:item,examID:this.examID,homeworkName:this.homeworkName});
        break;
      case 3://判断题
        this.navCtrl.push(AddPanDuanPage, {item:item,examID:this.examID,homeworkName:this.homeworkName});
        break;
      case 4://解答题
        this.navCtrl.push(AddJieDaPage, {item:item,examID:this.examID,homeworkName:this.homeworkName});
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
        this.xz.push(res.json().data[i].titleId);
      }
    });


    //添加填空题
    this.http.request("http://101.201.238.157/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=2").subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.tk.push(res.json().data[i].titleId);
      }
    });

    //添加判断题
    this.http.request("http://101.201.238.157/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=3").subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.pd.push(res.json().data[i].titleId);
      }
    });

    //添加解答题
    this.http.request("http://101.201.238.157/demo/index/getQuesByHomeworkName?name="+this.homeworkName+"&type=4").subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        this.jd.push(res.json().data[i].titleId);
      }
    });
  }
}
