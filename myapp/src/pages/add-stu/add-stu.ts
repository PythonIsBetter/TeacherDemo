import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
import {StuInfoPage} from "../stu-info/stu-info";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AddStuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-stu',
  templateUrl: 'add-stu.html',
})
export class AddStuPage {
  classId: any;
  id:string;
  name:string;
  age:string;

  urlGetStuNotPassed:string;
  urlGetStuPassed: string;
  urlLetStuPassed:string;
  urlLetStuAllPassed:string;
  /*thisYear:number;*/

  students:Array<{id:string,name:String,nickname:string,email:string,birthday:string,gender:string,avatar:string,uid:string,school:string}>;
  studentsNotPassed:Array<{id:string,name:String,nickname:string,email:string,birthday:string,gender:string,avatar:string,uid:string,school:string}>;
  studentsPassed:Array<{id:string,name:String,nickname:string,email:string,birthday:string,gender:string,avatar:string,uid:string,school:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController) {

    this.classId = navParams.get('classId');
    console.log(this.classId);
    this.studentsNotPassed = [];
    this.studentsPassed = [];
    this.students = [];


    this.urlGetStuPassed = "http://222.73.69.146:8088/index.php/demo/index/getStuPassed1?id=";
    this.urlGetStuNotPassed="http://222.73.69.146:8088/index.php/demo/index/getStuNotPassed1?id=";

    /*this.urlLetStuPassed="http://222.73.69.146:8088/index.php/demo/index/letStuPassed";*/
    this.urlLetStuPassed="http://222.73.69.146:8088/index.php/demo/index/letStuPassed";
    this.urlLetStuAllPassed="http://222.73.69.146:8088/index.php/demo/index/letStuAllPassed";

    this.urlGetStuNotPassed += this.classId;
    this.urlGetStuPassed += this.classId;

    this.http.request(this.urlGetStuNotPassed)
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().data.length;i++)
        {
          this.studentsNotPassed.push({
            id:res.json().data[i].id,
            name:res.json().data[i].name,
            nickname:res.json().data[i].nickname,
            email:res.json().data[i].email,
            birthday:res.json().data[i].birthday,
            gender: (res.json().data[i].gender == "1") ? '男' : '女',
            avatar:res.json().data[i].avatar,
            uid:res.json().data[i].uid,
            school:res.json().data[i].school,
          });
        }
      });
    console.log(this.studentsNotPassed);


    this.http.request(this.urlGetStuPassed)
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().data.length;i++)
        {
          this.studentsPassed.push({
            id:res.json().data[i].login_id,
            name:res.json().data[i].name,
            nickname:res.json().data[i].nickname,
            email:res.json().data[i].email,
            birthday:res.json().data[i].birthday,
            gender:res.json().data[i].gender,
            avatar:res.json().data[i].avatar,
            uid:res.json().data[i].uid,
            school:res.json().data[i].school,
          });
        }
      });
  }

  letStuPassed(uid){
    this.urlLetStuPassed="http://222.73.69.146:8088/index.php/demo/index/letStuPassed";
    this.urlLetStuPassed = this.urlLetStuPassed+"?"+"id="+uid+"&&claid="+this.classId;
    this.http.get(this.urlLetStuPassed)
      .subscribe(res=>{
        //alert(res.json());
        if(res.json().data=="1")
        {
          // alert("创建成功");
          let toast = this.toastCtrl.create({
            message: '通过成功',
            duration: 2000,
            position:'middle'
          });
          toast.present();
        }else{
          // alert("创建失败");
          let toast = this.toastCtrl.create({
            message: '通过失败',
            duration: 2000,
            position:'middle'
          });
          toast.present();
        }

      });
  }

  letAllStuPassed(){
    this.urlLetStuAllPassed=this.urlLetStuAllPassed+"?"+"id="+this.classId.id;
    this.http.get(this.urlLetStuAllPassed)
      .subscribe(res=>{
        //alert(res.json());
        if(res.json().data=="0")
        {
          // alert("创建成功");
          let toast = this.toastCtrl.create({
            message: '全部通过失败',
            duration: 2000,
            position:'middle'
          });
          toast.present();
        }else{
          // alert("创建失败");
          let toast = this.toastCtrl.create({
            message: '全部通过成功',
            duration: 2000,
            position:'middle'
          });
          toast.present();
        }

      });
  }

  stuInfo(event,item) {
    this.navCtrl.push(StuInfoPage, {
      id: item,//id
    });
  }


  doRefresh(refresher) {
      console.log('Begin async operation', refresher);

      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
  }


}





