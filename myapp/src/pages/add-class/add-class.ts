import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AddClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-class',
  templateUrl: 'add-class.html',
})
export class AddClassPage {

  url:string;
  id:string;
  name:string;
  subject:string;
  head:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http) {

    this.url="http://101.201.238.157/demo/index/cla_insert";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClassPage');
  }
  addclass():void{
    // this.id="111";
    // this.name="name";
    // this.subject="subject";
    // this.head="head";
    // this.url=this.url+"?"+"id="+this.id+"&"
    //   +"name="+this.name+"&"+"subject="+this.subject
    //   +"&"+"head="+this.head;
    // // alert(this.url);
    // this.http.get(this.url)
    //   .subscribe(res=>{
    //     //alert(res.json());
    //
    //   });
    this.id= (<HTMLInputElement>document.getElementById("idx")).value;
    this.name= (<HTMLInputElement>document.getElementById("namex")).value;
    this.subject= (<HTMLInputElement>document.getElementById("subjectx")).value;
    this.head= (<HTMLInputElement>document.getElementById("headx")).value;
    this.url=this.url+"?"+"id="+this.id+"&"
      +"name="+this.name+"&"+"subject="+this.subject
      +"&"+"head="+this.head;

   // alert(this.url);
    this.http.get(this.url)
      .subscribe(res=>{
        //alert(res.json());
        if(res.json().data=="1")
        {
          alert("创建成功");
        }else{
          alert("创建失败");
        }

      });
    // let params=JSON.stringify({id:this.id,name:this.name,subject:this.subject,head:this.head});
    // this.http.post(this.url,params).subscribe(res=>{
    //       //alert(res.json());
    //       // if(res.json().data=="1")
    //       // {
    //       //   alert("创建成功");
    //       // }else{
    //       //   alert("创建失败");
    //       // }
    //
    //     });
  }
}