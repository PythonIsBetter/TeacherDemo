import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http,Response} from "@angular/http";

/**
 * Generated class for the AfterStuHomeWorkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-after-stu-home-work-detail',
  templateUrl: 'after-stu-home-work-detail.html',
})
export class AfterStuHomeWorkDetailPage {

  // 接收题目
  test: Object;
  // 接收知识点id
  cid: any;
  // 接收知识点名字
  cname:string;
  //登录用户ID
  user: string;
  //知识点id
  subject_id: string;
  //题目序号
  test_number: number;
  //题目总数
  count:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private  http: Http,public app :App) {
    this.test_number = this.navParams.get("test_number");
    this.cid = navParams.get("cid");
    this.user=this.navParams.get('stuid');
    this.cname = navParams.get("cname");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AfterStuHomeWorkDetailPage');
    console.log(this.user,this.cid);
    this.http.request("http://47.100.203.126:81/index.php/demo/index/request777/?hid="+this.cid+"&uid="+ this.user)
      .subscribe((res: Response) => {
        this.test = res.json();
        console.log(this.test);
        this.count = res.json().length;
      });

  }

  itemSelected(){
    this.app.getRootNav().push('PagedetailPage');

  }

  // 跳转到下一页 或返回知识点列表
  nextSubject(){
    if (this.test_number < this.count) {
      this.test_number ++;
    }else {

    }

  }
  //跳转到上一题
  leftSubject() {
    if (this.test_number == 1) {

    }else {
      this.test_number --;
    }
  }

  //跳转到下一个页面
  nextPage(){
    this.navCtrl.push('PageexamPage');
    //this.app.getRootNav().push('PageexamPage');

  }
}
