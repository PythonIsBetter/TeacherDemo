import {Component, Inject} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {RecordingvideoPage} from "../recordingvideo/recordingvideo";
import {FormControl} from "@angular/forms";
import {Http, Response} from "@angular/http";
import {StuParcticePage} from "../stu-parctice/stu-parctice";


/**
 * Generated class for the ChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html',
})
export class ChoosePage {
  student: any;
  classInfo: any;

  // 接收数据
  listData: any;
  listD1: any = [];
  D1len: any;
  listD2: any = [];
  // 课程
  subject: string;
  subjectId: number;
  subjectNum: string = "1";
  subjectindexData: any = [];
  // 用户
  //user: string = localStorage.getItem("user");
  userid: string;

  private titleFilter: FormControl = new FormControl();
  private keyword: string;
  type: string;

  constructor(@Inject('appService') private appService, public app: App, public navCtrl: NavController, public navParams: NavParams, private  http: Http) {
    this.subjectindex();
    this.student = this.navParams.get("student");
    this.userid = this.student.uid;
    this.classInfo = this.navParams.get("classInfo");
    this.subjectId = this.navParams.get("subjectId");
    console.log(this.classInfo, this.student);
  }

  ionViewDidLoad() {
    /*this.http.request("http://47.100.203.126:81/index.php/demo/index/cid_subjects?subject=" + this.subject)
      .subscribe((res: Response) => {
        this.subjectId = res.json().data;
        console.log(this.subjectId)
      });*/
    let part = this;
    console.log(this.subjectId,this.userid);
    //进入页面请求知识点
    this.http.request("http://47.100.203.126:81/index.php/demo/index/request_record_list/?id=" + this.userid + "&cid=" + this.subjectId)
      .subscribe((res: Response) => {
        this.listData = res.json();
        this.listData.forEach(function (e) {
          if (e.type == '1') {
            part.listD1.push(e);
          } else if (e.type == '2') {
            part.listD2.push(e);
          }
        });
        console.log(this.listD1)
        this.D1len = this.listD1.length;
        console.log(this.D1len)
      });
  }

  segmentChanged() {
    //console.log(event.value);
    let part = this;
    this.http.request("http://47.100.203.126:81/index.php/demo/index/request_record_list/?id=" + this.userid + "&cid=" + this.subjectId)
      .subscribe((res: Response) => {
        this.listData = res.json();
        part.listD1 = [];
        part.listD2 = [];
        this.listData.forEach(function (e) {
          if (e.type == '1') {
            part.listD1.push(e);
          } else if (e.type == '2') {
            part.listD2.push(e);
          }
        });
        this.D1len = this.listD1.length;
        console.log(this.D1len)
      });

  }

  subjectindex() {
    this.appService.subjectindex().then(
      res => {
        if (res.code == 200) {
          this.subjectindexData = res.content
          this.Selected(this.subjectindexData[0].id);
          console.log(this.subjectindexData)
        }

      },
      error => {
        // alert('错误')
        console.log(error)
      }
    )
  }


  itemSelectedchild(event, j, itemch) {
    event.stopPropagation();
    //this.app.getRootNav().push(StuParcticePage, {subject: itemch, cid: itemch.id,stuid:this.userid});
    this.navCtrl.push(StuParcticePage, {subject: itemch, cid: itemch.id,stuid:this.userid});
    console.log(j)
  }

  itemSelected(j, item) {
    console.log(this.listData[j]);
    if (this.listData[j].sub_knowledege.length == 0) {
      //this.app.getRootNav().push(StuParcticePage, {subject: item, cid: item.id,stuid:this.userid});
      this.navCtrl.push(StuParcticePage, {subject: item, cid: item.id,stuid:this.userid});
    } else {
      for (let i = 0; i < this.listData.length; i++) {
        if (i == j) {
          this.listData[i].open = !this.listData[i].open;
        } else {
          this.listData[i].open = false
        }
      }
    }
  }

  Selected(subject) {
    this.subjectNum = subject;
    this.subject = subject;
  }

  toVideo(event) {
    this.navCtrl.push(RecordingvideoPage, {});
  }
}
