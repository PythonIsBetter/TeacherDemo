import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ClassPage} from "../pages/class/class";
import {AddClassPage} from "../pages/add-class/add-class";
import {Http}from '@angular/http';
import {HttpModule}from '@angular/http';
import {StoragePage} from "../pages/storage/storage";
import {PersonalInfoPage} from "../pages/personal-info/personal-info";
import {ClassDetailPage} from "../pages/class-detail/class-detail";
import {StuManagePage} from "../pages/stu-manage/stu-manage";
import {AddStuPage} from "../pages/add-stu/add-stu";
import {StuConPage} from "../pages/stu-con/stu-con";
import {PublishHomeworkPage} from "../pages/publish-homework/publish-homework";
import {SelectQuestionPage} from "../pages/select-question/select-question";
import {StuPrePage} from "../pages/stu-pre/stu-pre";
import {EditQuestionPage} from "../pages/edit-question/edit-question";
import {PublishNoticePage} from "../pages/publish-notice/publish-notice";
import {ShareFilePage} from "../pages/share-file/share-file";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ClassPage,
    AddClassPage,
    StoragePage,
    PersonalInfoPage,
    ClassDetailPage,
    StuManagePage,
    AddStuPage,
    StuConPage,
    PublishHomeworkPage,
    SelectQuestionPage,
    StuPrePage,
    SelectQuestionPage,
    EditQuestionPage,
    PublishNoticePage,
    ShareFilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ClassPage,
    AddClassPage,
    StoragePage,
    PersonalInfoPage,
    ClassDetailPage,
    StuManagePage,
    AddStuPage,
    StuConPage,
    PublishHomeworkPage,
    SelectQuestionPage,
    StuPrePage,
    SelectQuestionPage,
    EditQuestionPage,
    PublishNoticePage,
    ShareFilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Http
  ]
})
export class AppModule {}
