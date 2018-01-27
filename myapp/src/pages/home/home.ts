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
  subjects:Array<String>;
  classes:Array<{id:String,name:String,subject:String,head:String,cid:String}>;

  constructor(public navCtrl: NavController,public http :Http) {
    this.classes=[];
    console.log(localStorage);

    this.http.request('http://101.132.70.102/api/index.php/subject/index')
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().content.length;i++)
        {
          this.subjects.push(
            res.json().content[i].subject_name,
          );
        }
      });
    this.classes.push({
      id:"12345",
      name:"一班",
      subject:"XX",
      head:"teach",
      cid:"测试id"
    });
    //this.url="http://localhost:8090/public/admin/index/insert";
    //this.url="http://222.73.69.146:8088/index.php/demo/index/cla_insert";
  }

  ionViewDidEnter(){//每次进入此页面均会刷新
    this.classes = [];//每次初始化班级
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
  }
  itemTapped(event, item) {
    this.navCtrl.push(AddClassPage, {
      item: item
    });
  }

  itemTapped1(item) {
    this.navCtrl.push(ClassDetailPage, {
      class: item,//传班级信息过去
    });
  }


}
