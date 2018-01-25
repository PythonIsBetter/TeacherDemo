import { Component, ViewChild,Inject} from '@angular/core';
import {AlertController, App, LoadingController, NavController, Slides, IonicPage, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;
  public backgroundImage = 'assets/icon/background-1.jpg';
  mobilelogin:any='admin';
  passwordlogin:any='admin998877';
  mobile:any='';
  password1:any;
  password2:any;
  code:any;
  mobileback:any;
  passwordback1:any;
  passwordback2:any;
  codeback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, @Inject('appService') private appService,public app: App) {
  }
// Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  goToLogin() {
    this.slider.slideTo(1);
  }

  login() {
    // this.app.getRootNav().push(TabsPage);
    // this.app.getRootNav().push(TabsPage);
    let servedata={username:this.mobilelogin,password:this.passwordlogin}
    // mobile	是	string	手机号
    // password	是	string	密码
    this.appService.loginTeacher(servedata).then(
      res => {
        if(res.code==200){
          res.content.userinfo.tokenId=res.content.tokenId
         // this.appComponent.userinfo=res.content.userinfo
         // this.appComponent.presentToast('登录成功!');
          localStorage.setItem('id',res.content.userinfo.id);
          localStorage.setItem('username',res.content.userinfo.username);
          localStorage.setItem('mobile',res.content.userinfo.mobile);
          localStorage.setItem('age',res.content.userinfo.age);
          localStorage.setItem('age',res.content.userinfo.age);
          localStorage.setItem('address',res.content.userinfo.address);
          localStorage.setItem('email',res.content.userinfo.email);
          localStorage.setItem('avatar',res.content.userinfo.avatar);
          console.log(res.content.userinfo.avatar);
          this.app.getRootNav().push(TabsPage);

        }else{
         // this.appComponent.presentToast(res.message); http://101.132.70.102
        }
      },
      error=>{
       // this.appComponent.presentToast('登录失败!');
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
