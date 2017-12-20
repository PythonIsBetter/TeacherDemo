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
import {AppService} from "../theme/AppService";
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
import {ReportHomeworkPage} from "../pages/report-homework/report-homework";
import {ReportHomeworkDetailPage} from "../pages/report-homework-detail/report-homework-detail";
import {ExerciseDetailPage} from "../pages/exercise-detail/exercise-detail";
import {ExercisePage} from "../pages/exercise/exercise";
import {ExerciseRightDetailPage} from "../pages/exercise-right-detail/exercise-right-detail";
import {AddJieDaPage} from "../pages/add-jie-da/add-jie-da";
import {TaskPage} from "../pages/task/task";
import {TaskDetailPage} from "../pages/task-detail/task-detail";
import {HomeworkResultPage} from "../pages/homework-result/homework-result";
import {HomeworkKindDetailPage} from "../pages/homework-kind-detail/homework-kind-detail";
import {HomeworkDetailListPage} from "../pages/homework-detail-list/homework-detail-list";
import {HomeworkDetailPage} from "../pages/homework-detail/homework-detail";

@NgModule({
  declarations: [
    MyApp,
    TaskPage,
    TaskDetailPage,
    ExerciseRightDetailPage,
    ExerciseDetailPage,
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
    ExercisePage,
    ShareFilePage,
    SubItemPage,
    AddXuanZePage,
    AddTianKongPage,
    AddPanDuanPage,
    AddJieDaPage,
    HomeworkListPage,
    DetailedQuestionPage,
    HomeworkForStudentPage,
    StudentDoneHomeworkPage,
    ReportHomeworkPage,
    ReportHomeworkDetailPage,
    HomeworkResultPage,
    HomeworkKindDetailPage,
    HomeworkDetailListPage,
    HomeworkDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskPage,
    TaskDetailPage,
    AboutPage,
    ExerciseRightDetailPage,
    ContactPage,
    ExerciseDetailPage,
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
    ExercisePage,
    ShareFilePage,
    QuaDetailPage,
    SubItemPage,
    AddXuanZePage,
    AddTianKongPage,
    AddPanDuanPage,
    AddJieDaPage,
    HomeworkListPage,
    DetailedQuestionPage,
    HomeworkForStudentPage,
    StudentDoneHomeworkPage,
    ReportHomeworkPage,
    ReportHomeworkDetailPage,
    HomeworkResultPage,
    HomeworkKindDetailPage,
    HomeworkDetailListPage,
    HomeworkDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: 'appService',  useClass: AppService},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Http
  ]
})
export class AppModule {}
