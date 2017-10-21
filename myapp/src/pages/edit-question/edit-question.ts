import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component
({
  selector: 'page-edit-question',
  templateUrl: 'edit-question.html',
})
export class EditQuestionPage
{
  selectedItem:any;
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad EditQuestionPage');
  }

}
