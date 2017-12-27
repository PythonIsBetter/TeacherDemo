import {Component, Inject} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BASEURLIMG} from "../../theme/theme.config";
import {MyApp} from "../../app/app.component";

/**
 * Generated class for the RecordingvideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recordingvideo',
  templateUrl: 'recordingvideo.html',
})
export class RecordingvideoPage {

  segmentModel: any;
  gender:string='f';
  topData:any;
  selectnum:number=0;
  vidoaarrData:any;
  userinfo:any;


  constructor(@Inject('appService') private appService ,public navCtrl: NavController, public navParams: NavParams) {
    this.getpageData();
    this.userinfo={avatar:null,email:null,id:7,integral:null,level:"admin",mobile:"18022366421",realname:"18022366421"}
  }
  toOperationPage(num){
    this.navCtrl.push('OperationPage',{num:num})
  }
  tapelessionindex(){//录播课视频列表
    // sid	是	string	科目id，默认是1
    // num	是	integer	数量
    // page	否 integer	第几页,默认是1
    let servedata={num:10,page:1,tokenId: this.userinfo.tokenId}
    this.appService.myViewTaped(servedata).then(
      res => {
        if(res.code==200){
          console.log(res)
          this.vidoaarrData=res.content.records;
          for (var i = 0; i < this.vidoaarrData.length; i++) {
            this.vidoaarrData[i].icon=BASEURLIMG+this.vidoaarrData[i].icon
          }

        }

        console.log(res)

      },
      error=>{
        // alert('错误')
        console.log(error)
      }
    )
  }
  swipeEvent(event){
//   //向左滑
// if(event.direction==2){
//   if(this.segmentsArray.indexOf(this.segmentModel)<2){
// this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)+1];
//   }
// }
// //向右滑
// if(event.direction==4){
//   if(this.segmentsArray.indexOf(this.segmentModel)>0){
// this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)-1];
//   }
// }

  }
  selecttab(i){
    this.selectnum=i;
    this.segmentModel=this.topData[i].id;
    this.tapelessionindex();
  }
  getpageData(){
    this.appService.subjectindex().then(
      res => {

        if(res.code==200){
          this.topData=res.content;
          console.log('=====topData=======');
          console.log(this.topData);
          console.log(this.selectnum);
          console.log(this.topData[this.selectnum]);
          this.segmentModel=this.topData[0].id;
          this.tapelessionindex();
        }

      },
      error=>{
        // alert('错误')
        console.log(error)
      }
    )
  }
  onSelectChange(selectedValue: any) {
    console.log('Selected', selectedValue);
  }

}
