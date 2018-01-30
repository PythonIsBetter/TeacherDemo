import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, App, ToastController,ModalController} from 'ionic-angular';
import {FormControl} from "@angular/forms";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx'
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
  inpustring:any='';
  classInfo:any;
  type:string;

  // 关键字
  private  keyword:string;
  private  titleFilter:FormControl = new  FormControl();
  constructor(public app: App,public navCtrl: NavController, public navParams: NavParams, private  http: Http,public toastCtrl: ToastController,public modalCtrl: ModalController) {
    //this.selectedItem = navParams.get('item');
    this.classInfo=navParams.get('classInfo');
    this.type=navParams.get('type');
    this.urlListKnowledge="http://101.201.238.157/demo/index/getHomeworkList";
    this.urlAddHomework="http://101.201.238.157/demo/index/addHomeworkList";
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
    console.log('ionViewDidLoad HomeworkListPage');
    this.http.request(this.urlListKnowledge+"?classid="+this.classInfo.cid)
      .subscribe((res: Response) => {
        this.listData = res.json().data;
        for (let i = 0; i < this.listData.length; i++) {
          this.items.push({
            name:this.listData[i].name,
            id:this.listData[i].id});
        }
        this.copeyitems=HomeworkListPage.deepCoyp(this.items)
      });
    console.log(this.type);
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
        type:this.type
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
}
