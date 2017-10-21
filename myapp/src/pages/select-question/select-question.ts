import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditQuestionPage} from "../edit-question/edit-question";

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
 // num:number;
  selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
    this.selectedItem = navParams.get('item');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad SelectQuestionPage');
  }

  edit(event, item)
  {
    this.navCtrl.push(EditQuestionPage,
      {
        item:item
      });
  }
}
