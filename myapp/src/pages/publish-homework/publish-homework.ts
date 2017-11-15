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
      // for(let i=0;i<res.json().data.length;i++)
      //   this.listData.push(
      //     res.json().data[i]
      //   );
        this.listData = res.json().data;
        // alert(this.listData[0].id);
        for (var i = 0; i < this.listData.length; i++) {
          this.items.push({cname:this.listData[i].cname,id:this.listData[i].id});
          // for (var j = 0; j < this.listData[i].children.length; j++) {
          //   this.items.push({cname:this.listData[i].children[j].cname,id:this.listData[i].children[j].id})
          // }
        }
        this.copeyitems=this.deepCoyp(this.items)
        // this.listData.push(
        //       res.json().data[0]
        //     );
        // alert(this.listData[0].cname);
      });
  }

  close(){
    this.inpustring=''
  }

  deepCoyp(source) {
    var result:any[]=[]
    var result:any[];
    for (var key in source) {
      result[key]=source[key]
      // result[key] = typeof source[key]==='object'? this.deepCoyp(source[key]): source[key];
    }
    return result;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    this.inpustring=val
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.copeyitems.filter((item) => {
        return (item.cname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //发布作业页面中，用户点了下一步后的跳转函数
  selectQuestion(event, item,item2,examID)
  {
    this.navCtrl.push(SelectQuestionPage,
      {
        item:item,
        item2:item2,
        homeworkName:this.homeName.name,
        examID:examID
      });
  }
}
