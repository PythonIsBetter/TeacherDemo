import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Response,Http} from "@angular/http";
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the AboutModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-modify',
  templateUrl: 'about-modify.html',
})
export class AboutModifyPage {

  user:string= localStorage.getItem("user");
  name:string ='';
  birthday:string= '';
  email:string = '';
  gender:string = "1";
  school: string = "";
  nickname: string = "";
  message:any = {};
  mobile:any;

  constructor(@Inject('appService') private appService,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,private  http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonModifyPage');
    this.http.request('http://www.robinjy.com/api/index.php/index/request1/' + this.user)
      .subscribe((res: Response) => {
        if (res.json() != null) {
          if ("name" in res.json()[0]) {
            this.name = res.json()[0].name;
          }
          if ("school" in res.json()[0]) {
            this.school = res.json()[0].school;
          }
          if ("birthday" in res.json()[0]) {
            this.birthday = res.json()[0].birthday;
            if ("email" in res.json()[0]) {
              this.email = res.json()[0].email;
            }
            if ("nickname" in res.json()[0]) {
              this.nickname = res.json()[0].nickname;
            }
            if ("gender" in res.json()[0]) {
              if(res.json()[0].gender == 2){
                this.gender = "2"
              }
            }
          }
        }
        //this.mobile = this.appComponent.userinfo.mobile;
      });
  }

  toModify(){
    this.message['name'] = this.name;
    this.message['birthday'] = this.birthday;
    this.message['email'] = this.email;
    this.message['gender'] = this.gender;
    this.message['nickname'] = this.nickname;
    this.message['user'] = this.user;
    this.message['school'] = this.school;

    this.appService.changeInfo(this.message).then(
      res => {
        if(res.code==200){
          console.log("提交成功");
          let toast = this.toastCtrl.create({
            message: '修改成功',
            duration: 2000,
            position:'middle'
          });
          toast.present();
          this.navCtrl.pop();
        }
        console.log(res)

      },
      error=>{
        // alert('错误')
        console.log(error)
      },

    )
  }

}
