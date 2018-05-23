import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Http, Response} from "@angular/http";
import {AfterStuHomeWorkDetailPage} from "../after-stu-home-work-detail/after-stu-home-work-detail";

/**
 * Generated class for the BeforeStuHomeWorkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-before-stu-home-work-detail',
  templateUrl: 'before-stu-home-work-detail.html',
})
export class BeforeStuHomeWorkDetailPage {
  //subjectID
  item: Object;

  //接收数据
  data: Object;
  //知识点id
  cid: string;
  //用户
  userid: string = localStorage.getItem("user");

  //题目总数
  count: any;
  //做题时间
  t: string;
  //正确数量
  correct: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public app: App, public alertCtrl: AlertController) {
    this.item = this.navParams.get("subject");//没用的这个subject
    this.cid = this.navParams.get("cid");
    this.userid = this.navParams.get('stuid');
    console.log(this.item);
    console.log(this.cid);
    console.log(this.userid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExerciseDetailPage');


    this.http.request("http://47.100.203.126:81/index.php/demo/index/request777/?hid="+this.cid+"&uid=" + this.userid)
      .subscribe((res: Response) => {
        this.data = res.json();
        this.count = res.json().length;
        console.log(this.data);
        if (this.count > 0) {
          //获取做题时间
          this.t = this.data[0].uptime;

          //获取正确题目数
          for (let a of res.json()) {
            if (a.answer == a.answer_record) {
              this.correct = this.correct + 1;
            }
          }
        } else {
          this.showAlert();
        }

      });

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '没有数据!',
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.navCtrl.pop()
          }
        }]
    });
    alert.present();
  }

  itemSelected(item, id, cname) {
    this.navCtrl.push(AfterStuHomeWorkDetailPage, {cid: item, test_number: id, cname: cname, stuid: this.userid});
    //this.app.getRootNav().push(StuParcticeDetailPage, {cid: item, test_number: id, cname: cname, stuid: this.userid});
  }

}
