import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {AddStuPage} from "../add-stu/add-stu";
import {ChoosePage} from "../choose/choose";
import {StuInfoPage} from "../stu-info/stu-info";

/**
 * Generated class for the StuManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stu-manage',
  templateUrl: 'stu-manage.html',
})
export class StuManagePage {

  choose: string ="1";//初始化为0，根据前台的ngmodel绑定值

  name:string;
  age:string;
  sex:string;
  school:string;
  condition :string;
  classInfo: any;
  url:string;
  students:Array<{id:string,name:String,nickname:string,email:string,birthday:string,gender:string,avatar:string,uid:string,school:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http) {
    this.classInfo = navParams.get('classInfo');//主要用班级cid
    this.choose = "1";

    this.url="http://47.100.203.126:81/index.php/demo/index/getStuPassed1?id=";//其实用的ｃｌａｓｓｉｄ
    this.url=this.url+this.classInfo.cid;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StuManagePage');
  }

  ionViewDidEnter(){

    this.students=[];
    this.http.request(this.url)
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().data.length;i++)
        {
          this.students.push({
            id:res.json().data[i].login_id,
            name:res.json().data[i].name,
            nickname:res.json().data[i].nickname,
            email:res.json().data[i].email,
            gender:(res.json().data[i].gender == "1") ? '男' : '女',
            birthday:res.json().data[i].birthday,
            avatar:res.json().data[i].avatar,
            uid:res.json().data[i].uid,
            school:res.json().data[i].school,
          });
        }
      });
    console.log(this.students);
  }
  /*segmentChanged(item1,item2) {
    if(this.choose == "2"){
      this.navCtrl.push(ExercisePage, {
        item: item2,//student
      });
    }
    if(this.choose == "3"){
      this.navCtrl.push(RecordingvideoPage, {
        item: item2,//student
      });
    }
  }*/

  itemTapped(item) {
    this.navCtrl.push(AddStuPage, {
      classInfo: item//传classid
    });
  }

  itemTapped1(item1,item2) {
    this.navCtrl.push(ChoosePage, {
      student: item1,
      classInfo: item2,//student
    });
  }

  stuInfo(item) {
    this.navCtrl.push(StuInfoPage, {
      item: item,
    });
  }




}
