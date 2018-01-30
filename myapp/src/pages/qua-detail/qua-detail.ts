import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
/**
 * Generated class for the QuaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qua-detail',
  templateUrl: 'qua-detail.html',
})
export class QuaDetailPage {

  // 接收数据
  listDetailData: Object;
  ques:any;
  student:any;
  subtitle:string;
  rightAnswer:string;
  stuAnswer:string;
  urlQuesDetail:string;
  urlQuesMessage:string;
  urlGetSubtitle:string;
  analysis:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private  http: Http) {
    this.subtitle="";
    this.ques=navParams.get('item');
    this.student = navParams.get('item2');
    this.urlQuesDetail="http://101.201.238.157/demo/index/getQuesDetail";
    this.urlGetSubtitle="http://101.201.238.157/demo/index/getKnowledgeByTitleId";
    this.urlQuesMessage="http://101.201.238.157/demo/index/getQuesMessage";
    this.urlQuesDetail+="?titleid="+this.ques.titleid;
    this.urlGetSubtitle+="?examid="+this.ques.examid;
    this.urlQuesMessage+="?stuid="+this.student.id+"&textid="+this.ques.titleid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuaDetailPage');
    // alert(this.urlQuesMessage);
    // this.http.request('http://101.201.238.157/index/requestMess')
    //   .subscribe((res: Response) => {
    //     this.listDetailData = res.json();
    //   });
    this.http.request(this.urlQuesDetail)
      .subscribe((res: Response) => {
        this.listDetailData = res.json().data;
      });
    this.http.request(this.urlGetSubtitle)
      .subscribe((res: Response) => {
        this.subtitle = res.json().data[0].cname;
      });
    this.http.request(this.urlQuesMessage)
      .subscribe((res: Response) => {
        if( res.json().data.length>0){
          this.rightAnswer = res.json().data[0].answer;
          this.stuAnswer = res.json().data[0].stuAnswer;
          this.analysis=res.json().data[0].analysis;
        }
      });

  }

}
