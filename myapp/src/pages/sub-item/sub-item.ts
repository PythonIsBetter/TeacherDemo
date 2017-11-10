import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response}from "@angular/http";
import { HttpModule } from '@angular/http';
import {StuPrePage} from "../stu-pre/stu-pre";
/**
 * Generated class for the SubItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-item',
  templateUrl: 'sub-item.html',
})
export class SubItemPage {

  student:any;
  test:any;
  subItems:Array<{id:String,name:String}>;
  url:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http ) {
    this.test = navParams.get('item');
    this.student = navParams.get('item2');
    this.subItems=[];
    this.url="http://101.201.238.157/demo/index/getSubjectItem";
    this.subItems.push({
      id:"0",
      name:"测试item"
    });
    this.url+="?subid="+this.test.id;

;    this.http.request(this.url)
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().data.length;i++)
        {
          this.subItems.push({
            id:res.json().data[i].id,
            name:res.json().data[i].cname,
          });
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubItemPage');
  }

  itemTapped(event, item,item2) {
    this.navCtrl.push(StuPrePage, {
      item: item,
      item2:item2
    });
  }

}
