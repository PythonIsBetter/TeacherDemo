import { App,NavController,IonicPage, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import {Http,Response} from "@angular/http";
import {ExerciseRightDetailPage} from "../exercise-right-detail/exercise-right-detail";

/**
 * Generated class for the ExerciseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercise-detail',
  templateUrl: 'exercise-detail.html',
})
export class ExerciseDetailPage {

  //subjectID
  item: Object;

  //接收数据
  data: Object;
  //知识点id
  cid: string;
  //用户
  user:string = "5";

  //测试答案
  an:string = "B";
  //题目总数
  count: any;
  //做题时间
  t:string;
  //正确数量
  correct: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public app: App) {

    this.item = this.navParams.get("subject");

    this.cid = this.navParams.get("cid");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExerciseDetailPage');
    console.log(this.item);

    this.http.request("http://47.100.203.126:81/index.php/index/request_record_test/"+this.user+"/" + this.cid)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.count = res.json().length;
        console.log(this.data);
        //获取做题时间
        this.t = this.data[0].uptime;

        //获取正确题目数
        for (var a of res.json()){
          if (a.answer == this.an) {
            this.correct = this.correct + 1;
          }
        }
      });

  }

  itemSelected(item,id,cname){
  this.app.getRootNav().push(ExerciseRightDetailPage,{cid:item,test_number:id,cname:cname});
  }

}
