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
  url: string;
  id: string;
  name: string;
  subject: string;
  head: string;
  subs: { [key: number]: string; };
  subjects: Array<{ id: String, name: String }>;

  classes: Array<{ id: String, name: String, subject: String, head: String, cid: String }>;
  sub: Array<String>;

  constructor(public navCtrl: NavController, public http: Http) {
    this.classes = [];
    console.log(localStorage);
  }

  ionViewDidEnter() {//每次进入此页面均会刷新

    this.subjects = [];
    /*this.http.request('http://www.robinjy.com/api/index.php/subject/index')
      .subscribe((res: Response) => {
        for (let i = 0; i < res.json().content.length; i++) {
          this.subs.constructor(res.json().content[i].id, res.json().content[i].subject_name);
        }
        console.log(this.subs);
      });*/

    this.classes = [];//每次初始化班级为空

    this.http.get('http://47.100.203.126:81/index.php/demo/index/cla_select')
      .toPromise()
      .then(res => {
        for (let i = 0; i < res.json().data.length; i++) {
          this.classes.push({
            id: res.json().data[i].id,
            name: res.json().data[i].name,
            subject: res.json().data[i].subject.toString(),
            head: res.json().data[i].head,
            cid: res.json().data[i].cid
          });
        }
        return res.json().data;
      }).then(data => {
      for (let i=0;i<data.length;i++){
      console.log(data[i].subject);
        this.http.request('http://47.100.203.126:81/index.php/demo/index/subjects_cid?cid=' + data[i].subject)
          .subscribe((res:Response)=> {
            this.classes[i].subject = res.json().data;
          })
      }
    })
    ;


    /*for (let i=0;i<this.classes.length;i++){
      this.http.request('http://47.100.203.126:81/index.php/demo/index/subjects_cid?cid=' + this.classes[i].subject)
        .subscribe((res:Response)=>{
          this.classes[i].subject = res.json().data;
        })
    }*/
    console.log(this.classes);
    console.log(this.subjects);


}
  itemTapped(event, item){
    this.navCtrl.push(AddClassPage, {
      item: item
    });
  }

  itemTapped1(item){
    this.navCtrl.push(ClassDetailPage, {
      classInfo: item,//传班级信息过去
    });
  }
}
