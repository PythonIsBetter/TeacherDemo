import { Component,Inject} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BASEURLIMG} from '../../theme/theme.config';
import {MyApp} from "../../app/app.component";


@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage
{
  segmentModel: any=0;
  gender:any;
  selecNUM:any=0;
  selecChiarnum:any=0;
  topData:any;
  selectnum:number=0;
  vidoaarrData:any={};
  charidARR:any=[];

  constructor(public appComponent:MyApp,@Inject('appService') private appService,public navCtrl: NavController, public navParams: NavParams)
  {
    this.getpageData();
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad RecordingvideoPage');
  }

  toOperationPage(num)
  {
    this.navCtrl.push('OperationPage',{num:num});
  }

  //录播课视频列表
  tapelessionindex()
  {
    // sid	是	string	科目id，默认是1
    // num	是	integer	数量
    // page	否 integer	第几页,默认是1
    let servedata={sid:this.segmentModel};
    this.appService.tapelessionindex(servedata).then
    (res =>
      {
        if(res.code==200)
        {
          this.vidoaarrData.knowledege=res.content.knowledege;
          this.onSelectChange(0);
        }
      },
      error=>
      {}
    )
  }

  //录播课视频列表
  tapelessionindexsid(sid)
  {
    let servedata={sid:this.segmentModel,kid:sid,page:1,num:10};
    this.appService.tapelessionindex(servedata).then
    (res =>
      {
        if(res.code==200)
        {
          this.vidoaarrData.lessions=res.content.lessions;
          for (var i = 0; i < this.vidoaarrData.lessions.length; i++)
          {
            this.vidoaarrData.lessions[i].icon=BASEURLIMG+this.vidoaarrData.lessions[i].icon;
          }
        }
        else
          {
          this.appComponent.presentToast(res.message);
        }
      },
      error=>
      {
        this.appComponent.presentToast(error);
      }
    )
  }

  selecttab(i)
  {
    this.selectnum=i;
    this.segmentModel=this.topData[i].id;
    this.tapelessionindex()
  }

  getpageData()
  {
    this.appService.subjectindex().then
    (res =>
      {
        if(res.code==200)
        {
          this.topData=res.content;
          this.segmentModel=this.topData[0].id;
          this.tapelessionindex();
        }
      },
      error=> { }
    )
  }

  onSelectChange(selectedValue: any)
  {
    this.selecNUM=selectedValue;
    this.charidARR=this.vidoaarrData.knowledege[this.selecNUM].children;
    if(this.charidARR.length==0)
    {
      this.tapelessionindexsid(this.vidoaarrData.knowledege[this.selecNUM].id);
    }
    else
      {
      this.tapelessionindexsid(this.charidARR[0].id);
      }
  }

  onSelectChangeChair(selectedValue: any)
  {
    this.selecChiarnum=selectedValue;
    this.tapelessionindexsid(this.vidoaarrData.knowledege[this.selecNUM].children[this.selecChiarnum].id);
  }

}
