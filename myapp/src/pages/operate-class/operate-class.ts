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
  claid:string;
  name:string;
  subjectid:String;
  head:string;
  subjects:Array<string>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public toast: ToastController) {
    this.claid = this.navParams.get('item');
    this.deleteUrl = "http://222.73.69.146:8088/index.php/demo/index/deleteClass";
    this.updateUrl = "http://222.73.69.146:8088/index.php/demo/index/updateClass";
    this.subjects=[];
    this.subjects.push("选择科目");
    this.http.request('http://101.132.70.102/api/index.php/subject/index')
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
    console.log('ionViewDidLoad OperateClassPage');
    console.log(this.claid);
  }

  deletee() {
          let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          });
          let options = new RequestOptions({
            headers: headers
          });
        let body = "id=" + this.claid;
    return new Promise((resolve, reject) => {
      this.http.post(this.deleteUrl, body, options )
        .map(res => res.json())
        .subscribe(data =>{
          if(data.code==200){
            let toast = this.toast.create({
              message: '删除此班级成功！',
              duration: 2000,
              position:'middle'
            });
            toast.present();
            this.navCtrl.push(HomePage);//如何使的不能返回到上一页
          }

        }, err => {console.log(err)})
    });
  }

  update(){
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = "claid=" + this.claid + "&name=" + this.name + "&subjectid=" + this.subjectid + "&head=" + this.head;
    return new Promise((resolve, reject) => {
      this.http.post(this.updateUrl, body, options )
        .map(res => res.json())
        .subscribe(data =>{
          if(data.code==200) {
            let toast = this.toast.create({
              message: '修改班级信息成功！',
              duration: 2000,
              position: 'middle'
            });
            toast.present();
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
}
