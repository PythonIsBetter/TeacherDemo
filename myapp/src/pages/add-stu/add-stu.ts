import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http,Response}from "@angular/http";
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
  selectedItem: any;
  id:string;
  name:string;
  age:string;
  sex:string;
  urlGetStuNotPassed:string;
  urlLetStuPassed:string;
  urlLetStuAllPassed:string;
  students:Array<{id:string,name:String,age:String,sex:String}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController) {
    this.selectedItem = navParams.get('item');
    // this.urlGetStuNotPassed="http://localhost:8090/public/admin/index/getStuNotPassed";
    // this.urlLetStuPassed="http://localhost:8090/public/admin/index/letStuPassed";
    // this.urlLetStuAllPassed="http://localhost:8090/public/admin/index/letStuAllPassed";

    this.urlGetStuNotPassed="http://101.201.238.157/demo/index/getStuNotPassed";
    this.urlLetStuPassed="http://101.201.238.157/demo/index/letStuPassed";
    this.urlLetStuAllPassed="http://101.201.238.157/demo/index/letStuAllPassed";

    this.urlGetStuNotPassed=this.urlGetStuNotPassed+"?"+"id="+this.selectedItem.id;
    this.students=[];
    this.students.push({
         id:"测试id",
        name:"测试名字",
        age:"测试年龄",
        sex:"测试性别",
      },
    );
    this.http.request(this.urlGetStuNotPassed)
      .subscribe((res:Response)=>{

        for(let i=0;i<res.json().data.length;i++)
        {
          this.students.push({
            id:res.json().data[i].login_id,
            name:res.json().data[i].name,
            age:res.json().data[i].age,
            sex:res.json().data[i].sex,
          });
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStuPage');
  }
  letStuPassed(id){
    this.urlLetStuPassed=this.urlLetStuPassed+"?"+"id="+id;
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
    this.urlLetStuAllPassed=this.urlLetStuAllPassed+"?"+"id="+this.selectedItem.id;
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
}
