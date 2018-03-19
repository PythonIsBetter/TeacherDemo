import { Component } from '@angular/core';
import { IonicPage,App, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../login/login";

/**
 * Generated class for the PageNewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'PageNewPage',
  segment: 'PageNewPage'
})
@Component({
  selector: 'page-page-new',
  templateUrl: 'page-new.html',
})
export class PageNewPage {

  constructor(public app: App,public navCtrl: NavController, public navParams: NavParams) {
  }


  goToHome(){
    // this.navCtrl.setRoot(TabsPage);
    //this.app.getRootNav().push(LoginPage);
    this.navCtrl.push(LoginPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PageNewPage');
  }

}
