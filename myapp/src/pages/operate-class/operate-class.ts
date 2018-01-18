import { Component,} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response,Headers,RequestOptions}from "@angular/http";

/**
 * Generated class for the OperateClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-operate-class',
  templateUrl: 'operate-class.html',
})
export class OperateClassPage {
  id: any;
  updateUrl: string;
  deleteUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.id = this.navParams.get('item');
    this.deleteUrl = "http://101.201.238.157/demo/index/deleteClass";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperateClassPage');
    console.log(this.id);
  }

  delete() {
          let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          });
          let options = new RequestOptions({
            headers: headers
          });
        let body = "id=" + this.id;
    return new Promise((resolve, reject) => {
      this.http.post(this.deleteUrl, body, options )
        .map(res => res.json())
        .subscribe(data =>{
          console.log(data);
        }, err => {console.log(err)})
    })
  }
}
