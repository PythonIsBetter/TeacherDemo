import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Response,Headers,RequestOptions}from "@angular/http";
import {AppService} from "../../theme/AppService";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,@Inject('appService') private appService) {
    this.id = this.navParams.get('item');
    this.updateUrl = "http://101.201.238.157/demo/index/deleteClass";
    this.deleteUrl = "";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperateClassPage');
  }

  delete() {
    /*
          let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          });
          let options = new RequestOptions({
            headers: headers
          });
        let body = JSON.stringify({
          id: this.id
        });
          // return new Promise((resolve, reject) => {
          //   this.http.post(this.deleteUrl, body, options )
          //     .map(res => res.json())
          //     .subscribe(data => resolve(data), err => reject(err))
          // })
          this.http.post(this.updateUrl,body,options).toPromise().then((response) => {
            //do something...
          });
        }*/
    // let body = {
    //   id: this.id
    // };
    // this.appService.deleteclass(body).then(res => {
    //   console.log("success")
    // }, error => {
    //   console.log("errorcnmaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    // });
    let body={username:"admin",password:"admin998877"};
    this.appService.loginTeacher(body).then(res => {
        console.log("success")
      }, error => {
        console.log("errorcnmaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      });


  }
}
