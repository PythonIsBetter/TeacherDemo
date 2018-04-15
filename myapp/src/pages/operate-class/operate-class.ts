import { Component,} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response,Headers,RequestOptions}from "@angular/http";
import { ToastController } from 'ionic-angular';
import {HomePage} from "../home/home";


/**
 * Generated class for the OperateClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operate-class',
  templateUrl: 'operate-class.html',
})
export class OperateClassPage {
  updateUrl: string;
  deleteUrl: string;
  classInfo: any;
  name:string;
  subjectid:number;
  head:string;
  subject:string;
  cid:string;
  subjects:Array<{id:string,name:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public toast: ToastController) {
    this.classInfo = this.navParams.get('classInfo');
    this.subjectid = 0;
    this.deleteUrl = "http://47.100.203.126:81/index.php/demo/index/deleteClass";
    this.updateUrl = "http://47.100.203.126:81/index.php/demo/index/updateClass";
  }

  ionViewDidLoad() {
    console.log(this.classInfo);
    this.subject = this.classInfo.subject;
    this.name = this.classInfo.name;
    this.head = this.classInfo.head;
    this.cid  = this.classInfo.cid;
  }
  ionViewDidEnter(){
    this.subjects = [];
    this.http.request('http://www.robinjy.com/api/index.php/subject/index')
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().content.length;i++)
        {
          if(res.json().content[i].subject_name!= this.subject)
          {
            this.subjects.push
            ({
              id: res.json().content[i].id,
              name: res.json().content[i].subject_name,
            });
          }
          console.log(this.subjects);
        }
      });
  }

  deletee() {
          let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          });
          let options = new RequestOptions({
            headers: headers
          });
        let body = "id=" + this.classInfo.id;
    return new Promise((resolve, reject) => {
      this.http.post(this.deleteUrl, body, options )
        .map(res => res.json())
        .subscribe(data =>{
          if(data.data=="deleteSuccess"){
            let toast = this.toast.create({
              message: '删除此班级成功！',
              duration: 2000,
              position:'middle'
            });
            toast.present();
            this.navCtrl.popToRoot();//如何使的不能返回到上一页
          }

        }, err => {console.log(err)})
    });
  }

  update(){
    this.http.request('http://47.100.203.126:81/index.php/demo/index/cid_subjects?subject=' + this.subject)
      .subscribe((res:Response)=>{
        console.log(res.json().data);
          let t = res.json().data;
        console.log(t);
          this.subjectid = t;
        console.log(this.subjectid);

        if(!(this.name != this.classInfo.name || this.head != this.classInfo.head || this.classInfo.subject != this.subject || this.cid != this.classInfo.cid)){
          let toast  =this.toast.create({
            message: '请至少修改一项',
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
        else {
          let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          });
          let options = new RequestOptions({
            headers: headers
          });
          let body = "claid=" + this.classInfo.id + "&name=" + this.name + "&subjectid=" + this.subjectid + "&head=" + this.head;
          return new Promise((resolve, reject) => {
            this.http.post(this.updateUrl, body, options)
              .map(res => res.json())
              .subscribe(data => {
                if (data.code == 200) {
                  let toast = this.toast.create({
                    message: '修改班级信息成功！',
                    duration: 2000,
                    position: 'middle'
                  });
                  toast.present();
                  this.navCtrl.popToRoot();
                }
              }, err => {
                let toast = this.toast.create({
                  message: '修改班级信息失败！！！',
                  duration: 3000,
                  position: 'middle'
                });
                toast.present();
              })
          })
        }
      });
    console.log(this.subject,this.subjectid);
    //let selectIndex=(<HTMLSelectElement>document.getElementById("mySelect")).selectedIndex + 1;
    /*let selectIndex = document.getElementById("mySelect").Value;
    console.log(selectIndex);
    this.subjectid = selectIndex.toString();*/
   /* this.name= (<HTMLInputElement>document.getElementById("namex")).value;
    this.head= (<HTMLInputElement>document.getElementById("headx")).value;*/


  }
}
