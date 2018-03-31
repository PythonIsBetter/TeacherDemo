import { Component,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController} from 'ionic-angular';
import {Camera,CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ImagePicker } from '@ionic-native/image-picker';
import { Media} from '@ionic-native/media';
import {Http, Response} from "@angular/http";

declare let navigator:any;

@IonicPage()
@Component({
  selector: 'page-share-file',
  templateUrl: 'share-file.html',
})
export class ShareFilePage
{
  timer:any;
  m:number;
  num:any;
  s:number;
  base64Image:any;
  voidlis:any;
  page:any=0;
  data:Date;
  year:any;
  month:any;
  day:any;
  hour:any;
  minute:any;
  second:any;
  ID:String;
  noticeTitle:string;
  noticeContent:string;

  constructor(private media: Media,private imagePicker: ImagePicker,private transfer: FileTransfer,
              public camera: Camera,public actionSheetCtrl: ActionSheetController,public cd: ChangeDetectorRef,
              public navCtrl: NavController, public navParams: NavParams,private http: Http)
  {
    this.voidint();
    //this.randomId();
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad PublishNoticePage');
  }

  randomId()
  {
    //获取时间
    this.data=new Date();
    this.year=this.data.getFullYear();
    this.month=this.data.getMonth()+1;
    this.day=this.data.getDate();
    this.hour=this.data.getHours();
    this.minute=this.data.getMinutes();
    this.second=this.data.getSeconds();

    //获取当前ID
    this.ID=this.year.toString()+this.month.toString()+this.day.toString()+
      this.hour.toString()+this.minute.toString()+this.second.toString();
  }

  geiviod()
  {
    var captureSuccess = (mediaFiles)=>
    {
      console.log('captureSuccess');
      console.log(mediaFiles);
      this.voidlis=mediaFiles;
      for (var i = 0; i < this.voidlis.length; i++)
      {
        console.log('mediaFiles');
        console.log(this.voidlis[i])
      }
    };

// capture error callback
    var captureError = (error) =>
    {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

// start audio capture
    navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});
  }

  voidint()
  {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady()
    {
      console.log(navigator.device.capture);
    }
  }

  getimg()
  {
    let actionSheet = this.actionSheetCtrl.create
    (
      {
        title: '图片上传',
        buttons:
          [
            {
              text: '拍照上传',
              role: 'takePhoto',
              handler: () =>
              {
                console.log('takePhoto');
                this.getPicture()
                // this.getPhoto();
              }
            },
            {
              text: '相册上传',
              handler: () =>
              {
                console.log('Album');
                this.getPictures()
                // this.takePhoto();
              }
            },
          ]
      }
    );
    actionSheet.present();
  }

  getPictures()
  {
    let options={maximumImagesCount:1,number:0};
    this.imagePicker.getPictures(options).then((results) =>
    {
      for (var i = 0; i < results.length; i++)
      {
        console.log('Image URI: ' + results[i]);
        this.upload(results[i])
      }
    }, (err) =>
    {
      console.log(err)
    });
  }
  getPicture(){
    const options: CameraOptions =
      {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        // destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

    this.camera.getPicture(options).then((imageData) => {

      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      console.log('getPicture');
      console.log(imageData);
      this.upload(imageData)
      //  this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) =>
    {
      // Handle error
      console.log(err);
    });
  }

  upload(fileurl)
  {
    console.log('upload:'+fileurl);
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions =
      {
        fileKey: 'upload',
        fileName: 'name.jpg',
        headers: {}
      };

    //上传id
    this.http.request('http://47.100.203.126:81/index.php/demo/index/uploadFile2?id='+this.ID)
      .subscribe((res: Response) => {});

    fileTransfer.upload(fileurl, encodeURI('http://47.100.203.126:81/index.php/demo/index/uploadFile'), options)
      .then((data) =>
      {
        // success
        console.log('success');
        // var dss  =  data.json();
        data.response=JSON.parse(data.response);
        console.log(data);
        if(data.response['code']=200){
          this.base64Image = data.response['data']['img_url'];
          console.log('base64Image:'+this.base64Image);
          this.cd.detectChanges();
        }
      }, (err) =>
      {
        console.log('err');
        console.log(err)
      })
  }

  //发布文字
  pushTheTitleAndContent()
  {
    if(this.noticeTitle==null||this.noticeContent==null)
      alert("请填写内容!");
    else
    {
      this.http.request('http://47.100.203.126:81/index.php/demo/index/addResource?id='+this.ID+'&title='+this.noticeTitle+'&content='+this.noticeContent).subscribe((res: Response) => {
        alert("分享成功");
        this.navCtrl.pop();
      });
    }
  }
}
