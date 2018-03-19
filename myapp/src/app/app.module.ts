import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
//import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { Media, MediaObject } from '@ionic-native/media';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
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
import {ChoosePage} from "../pages/choose/choose";
import {RecordingvideoPage} from "../pages/recordingvideo/recordingvideo";
import {HomeworkModifyPage} from "../pages/homework-list/homework-modify";
import {VideoPage} from "../pages/video/video";
import {OperationPage} from "../pages/operation/operation";
import {BlankPage} from "../pages/blank/blank";
import {OperateClassPage} from "../pages/operate-class/operate-class";
import {LoginPage} from "../pages/login/login";
import {StuInfoPage} from "../pages/stu-info/stu-info";
import {MultiplePublishPage} from "../pages/multiple-publish/multiple-publish";
import {AboutModifyPage} from "../pages/about/about-modify";
import {PageNewPage} from "../pages/page-new/page-new";

@NgModule({
  declarations: [
    MyApp,
    TaskPage,
    RecordingvideoPage,
    HomeworkModifyPage,
    ChoosePage,
    TaskDetailPage,
    ExerciseRightDetailPage,
    ExerciseDetailPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
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
    HomeworkDetailPage,
    VideoPage,
    OperationPage,
    BlankPage,
    OperateClassPage,
    LoginPage,
    StuInfoPage,
    MultiplePublishPage,
    AboutModifyPage,
    PageNewPage
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
    ChoosePage,
    HomeworkModifyPage,
    RecordingvideoPage,
    TaskDetailPage,
    AboutPage,
    ExerciseRightDetailPage,
    ContactPage,
    ExerciseDetailPage,
    HomePage,
    TabsPage,
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
    HomeworkDetailPage,
    VideoPage,
    OperationPage,
    BlankPage,
    OperateClassPage,
    LoginPage,
    StuInfoPage,
    MultiplePublishPage,
    AboutModifyPage,
    PageNewPage
  ],
  providers: [
    ScreenOrientation,
    Camera,
    FileTransfer,
    File,
    Media,
    ImagePicker,
    FileTransferObject,
    StatusBar,
    SplashScreen,
    HttpModule,
    // VideoPlayer,
    {provide: 'appService',  useClass: AppService},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
