/**
 * Created by Yang.B on 2017/10/5 16:19.
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component(
  {
    selector: 'page-personalInfo',
    templateUrl: 'personalInfo.html',
  })

export class PersonalInformation
{
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {}

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad PersonalInformation');
  }

}
