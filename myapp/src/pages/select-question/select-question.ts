import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-question',
  templateUrl: 'select-question.html',
})
export class SelectQuestionPage
{
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad SelectQuestionPage');
  }
}
