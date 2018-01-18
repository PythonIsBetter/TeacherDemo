import {App, NavController,IonicPage, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Http,Response} from '@angular/http';
import {ExerciseDetailPage} from '../exercise-detail/exercise-detail';

/**
 * Generated class for the ExercisePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exercise',
  templateUrl: 'exercise.html',
})
export class ExercisePage {

  selectedItem:any;//主要传班级id过来
  listData:any;
  // 课程
  subject: string ="1";//初始化为1，根据前台的ngmodel绑定subject的值
  // 用户
  user: string;
  username: String;

  students:Array<{id:string,name:String,nickname:string,email:string,birthday:string,gender:string,avatar:string,uid:string,school:string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private  http: Http, public app: App) {
    this.user = this.navParams.get('item').uid;
    this.username = this.navParams.get("item").name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExercisePage');
    /*console.log(this.user);//5?
    console.log(localStorage);*/

    //进入页面请求知识点
    this.http.request("http://101.201.238.157/index/request_record_list/"+this.user+"/" + this.subject)
      .subscribe((res: Response) => {
        this.listData = res.json();
      });

  }


  //请求不同科目的知识点
  segmentChanged() {
    this.http.request("http://101.201.238.157/index/request_record_list/"+this.user+"/" + this.subject)
      .subscribe((res: Response) => {
        this.listData = res.json();
      });
  }

  itemSelectedchild(event,j,itemch){
    event.stopPropagation();
    this.app.getRootNav().push(ExerciseDetailPage,{subject:itemch,cid:itemch.id});//不知道为什么这里的推送page是不能加引号，但是拷贝的版本是有引号的
    console.log(j)
  }

  itemSelected(j,item){
    console.log(this.listData[j]);
    if(this.listData[j].sub_knowledege.length==0){
      this.app.getRootNav().push(ExerciseDetailPage,{subject:item,cid:item.id});
    }else{
      for (var i = 0; i < this.listData.length; i++) {
        if(i==j){
          if(this.listData[i].open){this.listData[i].open=false}else{this.listData[i].open=true}
        }else{
          this.listData[i].open=false
        }
      }
    }
  }

}

