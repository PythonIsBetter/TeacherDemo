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
  num:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private  http: Http) {
    this.num=navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuaDetailPage');
    this.http.request('httP://101.201.238.157/index/requestMess')
      .subscribe((res: Response) => {
        this.listDetailData = res.json();
      });
  }

}
