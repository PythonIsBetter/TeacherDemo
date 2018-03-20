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

    this.url="http://47.100.203.126:81/index.php/demo/index/cla_insert";
    this.subjects=[];
    this.subjects.push("选择科目");
    this.http.request('http://www.robinjy.com/api/index.php/subject/index')
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().content.length;i++)
        {
          this.subjects.push(
            res.json().content[i].subject_name,
          );
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClassPage');
    console.log(this.subjects);//http://www.robinjy.com/api/index.php/subject/index

  }
  addclass(){
    let selectIndex=(<HTMLSelectElement>document.getElementById("mySelect")).selectedIndex;
    this.id= (<HTMLInputElement>document.getElementById("idx")).value;
    this.name= (<HTMLInputElement>document.getElementById("namex")).value;
    this.subject= (selectIndex).toString();
    console.log(this.subject);
    this.head= (<HTMLInputElement>document.getElementById("headx")).value;

    this.url=this.url+"?"+"id="+this.id+"&"
      +"name="+this.name+"&"+"subject="+this.subject
      +"&"+"head="+this.head;

    if(!(this.name&&this.subject&&this.head&&this.id)){
      let toast  =this.toastCtrl.create({
        message: '请完善所有的必填项',
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
    else
    {this.http.get(this.url)
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
            this.navCtrl.popToRoot();
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
    }
  }
}
