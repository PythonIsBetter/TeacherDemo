import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, App, ToastController,ModalController} from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {Http,Response,Headers,RequestOptions} from "@angular/http";
import {Dialogs} from '@ionic-native/dialogs';
import 'rxjs/Rx';
import {PublishHomeworkPage} from "../publish-homework/publish-homework";
import {HomeworkModifyPage} from "./homework-modify";

@IonicPage()
@Component({
  selector: 'page-homework-list',
  templateUrl: 'homework-list.html',
})
export class HomeworkListPage {

  //selectedItem: any;
  listData:any;
  items: any[];
  copeyitems:any[];
  urlListKnowledge:string;
  urlAddHomework:string;
  urlDeleteHomework:string;
  inpustring:any='';
  classInfo:any;
  type:string;
  cid:String;
  subject:string;


  // 关键字
  private  keyword:string;
  private  titleFilter:FormControl = new  FormControl();
  private urlGetCid: string;
  constructor(public app: App,public navCtrl: NavController, public navParams: NavParams, private  http: Http,public toastCtrl: ToastController,public modalCtrl: ModalController) {
    //this.selectedItem = navParams.get('item');
    this.classInfo=navParams.get('classInfo');
    this.urlGetCid = "http://47.100.203.126:81/index.php/demo/index/cid_subjects?subject=" ;
    this.subject = navParams.get('classInfo').subject;
    this.type=navParams.get('type');
    this.urlListKnowledge="http://47.100.203.126:81/index.php/demo/index/getHomeworkList";
    this.urlAddHomework="http://47.100.203.126:81/index.php/demo/index/addHomeworkList";
    this.urlDeleteHomework = "http://47.100.203.126:81/index.php/demo/index/deleteHomeworkByid";
    this.listData=[];
    this.copeyitems=[];
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(value=>this.keyword=value);
    this.items = this.copeyitems;
  }

  presentContactModal() {
    //this.app.getRootNav().push(HomeworkModifyPage);
    let toHomeworkModify = this.modalCtrl.create(HomeworkModifyPage);
    toHomeworkModify.present();
    toHomeworkModify.onDidDismiss(data => {
      if(data != "cancel"){
        console.log(data);
        this.addHomeworklist(data);
      }
    });
  }
  ionViewDidEnter() {
    this.items=[];
    this.listData = [];
    console.log('ionViewDidLoad HomeworkListPage');
    this.http.request(this.urlListKnowledge+"?classid="+this.classInfo.id)

    this.http.request(this.urlGetCid + this.subject)
      .subscribe((res: Response) => {
        this.cid  = res.json().data;
      });

    this.http.request(this.urlListKnowledge+"?classid="+this.classInfo.id)
      .subscribe((res: Response) => {
        this.listData = res.json().data;
        for (let i = 0; i < this.listData.length; i++) {
          this.items.push({
            name:this.listData[i].name,
            id:this.listData[i].id});
        }
        this.copeyitems=HomeworkListPage.deepCoyp(this.items)
      });
    console.log(this.listData);
  }

  close(){
    this.inpustring=''
  }

  static deepCoyp(source) {
    let result:any[] = [];
    for (let key in source) {
      result[key]=source[key]
      // result[key] = typeof source[key]==='object'? this.deepCoyp(source[key]): source[key];
    }
    return result;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
    // set val to the value of the searchbar
    let val = ev.target.value;
    this.inpustring=val;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.copeyitems.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //发布作业页面中，用户点了下一步后的跳转函数
  selectQuestion(event, item)
  {
    this.navCtrl.push(PublishHomeworkPage,
      {
        item:item,
        cid:this.cid
      });
  }

  addHomeworklist(inputString){
    this.urlAddHomework+="?name="+inputString+"&classid="+this.classInfo.id;
    this.http.request(this.urlAddHomework)
      .subscribe((res: Response) => {
        if(res.json().data=="1")
        {
          // alert("创建成功");
          let toast = this.toastCtrl.create({
            message: '添加成功',
            duration: 2000,
            position:'middle'
          });
          toast.present();
        }else{
          // alert("创建失败");
          let toast = this.toastCtrl.create({
            message: '添加失败',
            duration: 2000,
            position:'middle'
          });
          toast.present();
        }
      });
  }

  deleteHomework(homeworkId){
    /*let promise = this.dialog.confirm(
      '要删除此班级吗?', // message
      "确认？",            // callback to invoke with index of button pressed
      ['取消','确认']     // buttonLabels
    );
    let t =0;
    promise.then(function (tt) {
      t = tt;
    });*/

    if (1) {
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let options = new RequestOptions({
        headers: headers
      });
      let body = "id" + homeworkId;
      return new Promise((resolve, reject) => {
        this.http.post(this.urlDeleteHomework, body, options)
          .map(res => res.json())
          .subscribe(data => {
            if (data.code == 200) {
              let toast = this.toastCtrl.create({
                message: '删除作业成功！',
                duration: 2000,
                position: 'middle'
              });
              toast.present();
              this.navCtrl.popToRoot();
            }
          }, err => {
            let toast = this.toastCtrl.create({
              message: '删除作业失败！！！',
              duration: 3000,
              position: 'middle'
            });
            toast.present();
          })
      })
    }
  }
  de(){
    console.log("de");
  }
}
