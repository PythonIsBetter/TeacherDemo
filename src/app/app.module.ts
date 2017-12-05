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
import {QuaDetailPage} from "../pages/qua-detail/qua-detail";
import {PublishNoticePage} from "../pages/publish-notice/publish-notice";
import {ShareFilePage} from "../pages/share-file/share-file";
import {SubItemPage} from "../pages/sub-item/sub-item";
import {AddXuanZePage} from "../pages/add-xuan-ze/add-xuan-ze";
import {AddTianKongPage} from "../pages/add-tian-kong/add-tian-kong";
import {AddPanDuanPage} from "../pages/add-pan-duan/add-pan-duan";
import {HomeworkListPage} from "../pages/homework-list/homework-list";
import {DetailedQuestionPage} from "../pages/detailed-question/detailed-question";
import {HomeworkForStudentPage} from "../pages/homework-for-student/homework-for-student";
import {StudentDoneHomeworkPage} from "../pages/student-done-homework/student-done-homework";
import {HomeworkReportPage} from "../pages/homework-report/homework-report";

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
    QuaDetailPage,
    PublishNoticePage,
    ShareFilePage,
    SubItemPage,
    AddXuanZePage,
    AddTianKongPage,
    AddPanDuanPage,
    HomeworkListPage,
    DetailedQuestionPage,
    HomeworkForStudentPage,
    StudentDoneHomeworkPage,
    HomeworkReportPage,
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
    PublishNoticePage,
    ShareFilePage,
    QuaDetailPage,
    SubItemPage,
    AddXuanZePage,
    AddTianKongPage,
    AddPanDuanPage,
    HomeworkListPage,
    DetailedQuestionPage,
    HomeworkForStudentPage,
    StudentDoneHomeworkPage,
    HomeworkReportPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Http
  ]
})
export class AppModule {}
