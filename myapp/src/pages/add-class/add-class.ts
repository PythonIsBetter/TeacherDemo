import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response}from "@angular/http";
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {HomePage} from "../home/home";
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
  subjects:Array<string>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController) {

    this.url="http://101.201.238.157/demo/index/cla_insert";
   // this.name=(<HTMLSelectElement>document.getElementsByClassName("mySelect")[0]).name;
    //this.name= (<HTMLInputElement>document.getElementById("namex")).value;
    this.subjects=[];
    this.subjects.push("选择科目");
    this.http.request('http://101.201.238.157/demo/index/selectSubject')
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().data.length;i++)
        {
          this.subjects.push(
            res.json().data[i].subject_name,
          );
        }
      });
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
    let selectIndex=(<HTMLSelectElement>document.getElementById("mySelect")).selectedIndex;

    //****************
    this.id= (<HTMLInputElement>document.getElementById("idx")).value;
    this.name= (<HTMLInputElement>document.getElementById("namex")).value;
    this.subject= (selectIndex).toString();
    this.head= (<HTMLInputElement>document.getElementById("headx")).value;
    this.url=this.url+"?"+"id="+this.id+"&"
      +"name="+this.name+"&"+"subject="+this.subject
      +"&"+"head="+this.head;

   // alert(this.url);
    this.http.get(this.url)
      .subscribe(res=>{
        //alert(res.json());
          console.log(this.url);
        if(res.json().code=="200")
        {

         // alert("创建成功");
          let toast = this.toastCtrl.create({
            message: '创建成功',
            duration: 2000,
            position:'middle'
          });
         toast.present();
         this.navCtrl.push(HomePage);
        }else{
          // alert("创建失败");
          let toast = this.toastCtrl.create({
            message: '创建失败',
            duration: 2000,
            position:'middle'
          });
          toast.present();
        }

      },
        err=>{
          let toast = this.toastCtrl.create({
            message: '创建失败',
            duration: 2000,
            position:'middle'
          });
          toast.present();
        }
      );
    //**************

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
