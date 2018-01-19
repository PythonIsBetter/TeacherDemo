import { Component,} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response,Headers,RequestOptions}from "@angular/http";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.claid = this.navParams.get('item');
    this.deleteUrl = "http://101.201.238.157/demo/index/deleteClass";
    this.updateUrl = "http://101.201.238.157/demo/index/updateClass";
    this.subjects=[];
    this.subjects.push("测试科目");
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
    console.log('ionViewDidLoad OperateClassPage');
    console.log(this.claid);
  }

  delete() {
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
          console.log(data);
        }, err => {console.log(err)})
    })
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
          console.log(data);
        }, err => {console.log(err)})
    })
  }
}
