import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response}from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {AddStuPage} from "../add-stu/add-stu";
import {StuConPage} from "../stu-con/stu-con";

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

  name:string;
  age:string;
  sex:string;
  school:string;
  condition :string;
  selectedItem: any;
  url:string;
  students:Array<{name:String,age:String,sex:String,school:String}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http) {
    this.selectedItem = navParams.get('item');

  //  this.url="http://localhost:8090/public/admin/index/getStuPassed";
      this.url="http://101.201.238.157/demo/index/getStuPassed";
    this.url=this.url+"?"+"id="+this.selectedItem.id;
    this.students=[];
    this.students.push({
      name:"XXX",
      age:"X岁",
      sex:"男",
      school:"XXX学校"
     }
    );
    this.http.request(this.url)
      .subscribe((res:Response)=>{

        for(let i=0;i<res.json().data.length;i++)
        {
          this.students.push({
            name:res.json().data[i].name,
            age:res.json().data[i].age,
            sex:res.json().data[i].sex,
            school:res.json().data[i].school
          });
        }
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StuManagePage');
  }

  itemTapped(event, item) {
    this.navCtrl.push(AddStuPage, {
      item: item
    });
  }

  itemTapped1(event, item) {
    this.navCtrl.push(StuConPage, {
      item: item
    });
  }


}
