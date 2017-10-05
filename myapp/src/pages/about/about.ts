import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StoragePage} from "../storage/storage";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
  itemTapped(event, item) {
    this.navCtrl.push(StoragePage, {
      item: item
    });
  }
}
