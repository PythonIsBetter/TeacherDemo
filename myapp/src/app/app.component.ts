import { Component,Injectable } from '@angular/core';
import { Platform,LoadingController,AlertController,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";
@Injectable()
@Component({
  selector:'ion-app',
  templateUrl: 'app.html'
})
export class MyApp
{
  //rootPage:any = TabsPage;
  rootPage:any = LoginPage;
  userinfo:any;
  pagenextarr:any;

  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController, public alertCtrl: AlertController,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    if(!this.userinfo){
      this.userinfo={avatar:null,email:null,id:7,integral:null,level:null,mobile:"18022366421",realname:"18022366421"}
    }
  }
  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: '提示',
        subTitle: message,
        buttons: ['确认']
      });
      alert.present();
    });

    loading.present();
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass:'cssClass',
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
