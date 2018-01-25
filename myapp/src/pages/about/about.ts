import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StoragePage} from "../storage/storage";
import {PersonalInfoPage} from "../personal-info/personal-info";

@Component(
  {
    selector: 'page-about',
    templateUrl: 'about.html'
  })
export class AboutPage
{
  avatarUrl:string;

  constructor(public navCtrl: NavController)
  {
    this.avatarUrl = "http://101.132.70.102" + localStorage.getItem('avatar');
  }

  itemTapped(event, item)
  {
    this.navCtrl.push(StoragePage,
      {
        item: item
      });
  }

  personalInfo(event,item)
  {
    this.navCtrl.push(PersonalInfoPage,
      {
        item:item
      });
  }
}
