import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response} from "@angular/http";
import {TaskDetailPage} from "../task-detail/task-detail";

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {

  // 接收数据
  listData: Object;
  // 课程
  subject: string ="1";
  user: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private  http: Http,public app:App) {

    this.user = this.navParams.get('item').uid;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeworkPage');
    this.http.request('http://47.100.203.126:81/index.php/index/request_homework_list/'+ this.user+"/"+this.subject)
      .subscribe((res: Response) => {
        this.listData = res.json();
        console.log(this.listData)
      });
  }

  //请求不同科目的知识点
  segmentChanged() {
    this.http.request('http://47.100.203.126:81/index.php/index/request_homework_list/'+ this.user+"/"+this.subject)
      .subscribe((res: Response) => {
        this.listData = res.json();
      });
  }

  totaskDetail(hid,name,uid){
    this.app.getRootNav().push(TaskDetailPage,{"hid":hid,"subject":name,"uid":uid});
  }

}
