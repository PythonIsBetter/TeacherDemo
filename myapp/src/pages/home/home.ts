import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AddClassPage} from "../add-class/add-class";
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ClassDetailPage} from "../class-detail/class-detail";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  url:string;
  id:string;
  name:string;
  subject:string;
  head:string;
  type:string;//科目代号，1语文 2数学 3英语
  subjects:Array<String>;
  classes:Array<{id:String,name:String,subject:String,head:String,cid:String}>;

  constructor(public navCtrl: NavController,public http :Http) {
    this.classes=[];
    //this.subjects=["测试","语文","数学","英语","高等数学","计算机","化学","化学","计算机网络","化学","思想品德"];
    // this.subjects.push("语文");
    // this.subjects.push("数学");
    // this.subjects.push("英语");
    //this.url="http://localhost:8090/public/admin/index/insert";
    //this.url="http://222.73.69.146:8088/index.php/demo/index/cla_insert";
    this.http.request('http://222.73.69.146:8088/index.php/demo/index/cla_select')
      .subscribe((res:Response)=>{
      for(let i=0;i<res.json().data.length;i++)
      {
        this.classes.push({
          id:res.json().data[i].id,
          name:res.json().data[i].name,
          subject:res.json().data[i].subject,
          head:res.json().data[i].head,
          cid:res.json().data[i].cid
        });
      }
    });
    console.log(this.classes);
  }
  itemTapped(event, item) {
    this.navCtrl.push(AddClassPage, {
      item: item
    });
  }

  itemTapped1(event, item, subject)
  {
    if(subject=="语文")
      this.type="1";
    else if(subject=="数学")
      this.type="2";
    else if(subject =="英语")
      this.type="3";
    this.navCtrl.push(ClassDetailPage,
      {
        item: item,
        type:this.type,
    });
  }

}
