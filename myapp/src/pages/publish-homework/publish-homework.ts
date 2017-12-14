import { AfterViewChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {SelectQuestionPage} from "../select-question/select-question";
import {Response, Http} from "@angular/http";
import {FormControl} from "@angular/forms";
import 'rxjs/Rx'

//发布作业界面

@IonicPage()
@Component(
  {
  selector: 'page-publish-homework',
  templateUrl: 'publish-homework.html',
})
export class PublishHomeworkPage
{
  homeName: any;
  listData:any;
  items: any[];
  copeyitems:any[];
  urlListKnowledge:string;
  inpustring:any='';

  // 关键字
  private  keyword:string;
  private  titleFilter:FormControl = new  FormControl();
  constructor(public app: App,public navCtrl: NavController, public navParams: NavParams, private  http: Http)
  {
    this.homeName = navParams.get('item');
    this.urlListKnowledge="http://101.201.238.157/demo/index/getAllKnowledge";
    this.listData=[];
    this.copeyitems=[];
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(value=>this.keyword=value);
    this.items = this.copeyitems;
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad PublishHomeworkPage');
    this.http.request(this.urlListKnowledge)
      .subscribe((res: Response) => {
        this.listData = res.json().data;
        // alert(this.listData[0].id);
        for (var i = 0; i < this.listData.length; i++) {
          this.items.push({cname:this.listData[i].cname,id:this.listData[i].id});
        }
        this.copeyitems=this.deepCoyp(this.items)
      });
  }

  close(){
    this.inpustring=''
  }

  deepCoyp(source) {
    var result:any[]=[]
    var result:any[];
    for (var key in source)
      result[key]=source[key];
    return result;
  }

  getItems(ev: any)
  {
    let val = ev.target.value;
    this.inpustring=val
    if (val && val.trim() != '') {
      this.items = this.copeyitems.filter((item) => {
        return (item.cname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //发布作业页面中，用户点了下一步后的跳转函数
  selectQuestion(event, item,item2)
  {
    this.navCtrl.push(SelectQuestionPage,
      {
        everyQuestion:item,//每一到道题目
        homeworkName:this.homeName.name
      });
  }
}
