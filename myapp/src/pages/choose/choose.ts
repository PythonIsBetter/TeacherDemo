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
  classInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = this.navParams.get("student");
    this.classInfo = this.navParams.get("classInfo");
    console.log(this.classInfo,this.student);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosePage');
  }

  toExercise(item1,item2) {
    this.navCtrl.push(ExercisePage, {
      student: item1,//student
      classInfo:item2,
    });
  }
  toVideo(event) {
    this.navCtrl.push(RecordingvideoPage, {
    });
  }
}
