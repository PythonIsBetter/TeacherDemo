import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ExercisePage} from "../exercise/exercise";
import {RecordingvideoPage} from "../recordingvideo/recordingvideo";

/**
 * Generated class for the ChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html',
})
export class ChoosePage {
  student : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = this.navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosePage');
  }

  toExercise(event, item) {
    this.navCtrl.push(ExercisePage, {
      item: item,//student
    });
  }
  toVideo(event) {
    this.navCtrl.push(RecordingvideoPage, {
    });
  }
}
