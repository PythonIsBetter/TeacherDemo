import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ContactPage} from "../contact/contact";
import {AddClassPage} from "../add-class/add-class";
import {ClassPage} from "../class/class";
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import {importExpr} from "@angular/compiler/src/output/output_ast";
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
  classes:Array<{id:String,name:String,subject:String,head:String}>;
  constructor(public navCtrl: NavController,public http :Http) {
    this.classes=[];
    this.classes.push({
      id:"111111",
      name:"一班",
      subject:"XX",
      head:"teach",
    });
    //this.url="http://localhost:8090/public/admin/index/insert";
    //this.url="http://101.201.238.157/demo/index/cla_insert";
    this.http.request('http://101.201.238.157/demo/index/cla_select')
      .subscribe((res:Response)=>{
      for(let i=0;i<res.json().data.length;i++)
      {
        this.classes.push({
          id:res.json().data[i].id,
          name:res.json().data[i].name,
          subject:res.json().data[i].subject,
          head:res.json().data[i].head,
        });
      }
    });

  }
  itemTapped(event, item) {
    this.navCtrl.push(AddClassPage, {
      item: item
    });
  }

  itemTapped1(event, item) {
    this.navCtrl.push(ClassDetailPage, {
      item: item
    });
  }

  test():void{
   // alert("aaa");
   //  this.http.get('http://www.tutorialspoint.com/json/data.json')
   //    .toPromise().then((response)=>{
   //    alert(response);
   // //  });
   //  this.http.get('http://www.tutorialspoint.com/json/data.json')
   //    .subscribe(res=>{
   //      alert(res.json());
   //    });

    // this.http.request('http://localhost:8090/public/admin/index/mysql')
    //   .subscribe((res:Response)=>{
    //   alert(res.json().data.length);
    //   });

    // this.http.request('http://localhost:8090/public/admin/index/mysql')
    //   .subscribe((res:Response)=>{
    //   for(let i=0;i<res.json().data.length;i++)
    //   {
    //     this.classes.push({
    //       id:res.json().data[i].id,
    //       name:res.json().data[i].name,
    //       subject:res.json().data[i].subject,
    //       head:res.json().data[i].name.head,
    //     });
    //   }
    // });
    //alert(this.classes[1].name);
    // this.id="111";
    // this.name="name";
    // this.subject="subject";
    // this.head="head";
    // this.url=this.url+"?"+"id="+this.id+"&"
    //   +"name="+this.name+"&"+"subject="+this.subject
    // +"&"+"head="+this.head;
    // // alert(this.url);
    // this.http.get(this.url)
    //    .subscribe(res=>{
    //      //alert(res.json());
    //
    //    });
  }


}
