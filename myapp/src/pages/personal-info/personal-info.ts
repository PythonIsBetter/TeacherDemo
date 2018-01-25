import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonalInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-info',
  templateUrl: 'personal-info.html',
})
export class PersonalInfoPage {

  id:string;
  username:string;
  mobile:string;
  age:string;
  address:string;
  email:string;
  avatar:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = localStorage.getItem('username');
    this.mobile = localStorage.getItem('mobile');
    this.age = localStorage.getItem('age');
    this.address = localStorage.getItem('address');
    this.email = localStorage.getItem('email');
    this.avatar =  localStorage.getItem('avatar');

  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalInfoPage');
  }

}
