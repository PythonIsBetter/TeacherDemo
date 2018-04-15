import { Component,Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,App} from 'ionic-angular';
import {Response, Http, RequestOptions} from "@angular/http";

/**
 * Generated class for the StudentHomeworkDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-homework-detail',
  templateUrl: 'student-homework-detail.html',
})
export class StudentHomeworkDetailPage {
  // 接收题目
  test: Object;
  // 接收作业id
  hid: any;
  // 接收知识点名字
  cname:string;
  //登录用户ID
  user: string;
  //知识点id
  subject_id: string;
  //题目序号
  test_number: number;
  //题目总数
  count:any;
  //答案详情
  data:any;
  //选项颜色
  selectCoA:any = false;
  selectCoB:any = false;
  selectCoC:any = false;
  selectCoD:any = false;
  pCoT:any = false;
  pCoF:any = false;
  //选择答案
  seAnswer:any = "";
  //判断答案
  pAnswer: any;
  //填空
  tiankong: any;
  //解答
  jieda: any;
  //所有答案
  toAnswer:any = {};
  //提交下一题按钮
  button:any = "下一题";
  //题目数组
  tArr:any = [];
  //答案数组
  aArr:any = [];
  //data
  pData:any = {};
  //是否提交过
  isUpdate:any
  //本地答案
  localAnswer :any = []
  local:any

  constructor(@Inject('appService') private appService,public navCtrl: NavController, public navParams: NavParams, private  http: Http,public app: App) {
    this.test_number = 1;
    this.hid = navParams.get('homework').id;
    this.user= navParams.get('student').uid;
    this.cname = navParams.get("homework").name;
    this.local = localStorage.getItem(this.cname);
    console.log(this.local);
    if (this.local != null){
      this.localAnswer = this.local.split(",");
    }
    this.isUpdate = localStorage.getItem(this.cname)
    console.log(this.localAnswer)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MistakeDetailPage');
    this.http.request("http://47.100.203.126:81/index.php/demo/index/request777/?hid="+ this.hid)
      .subscribe((res: Response) => {
        this.test = res.json();
        console.log(this.test);
        this.count = res.json().length;
      });
    this.pData["userid"] = this.user;
    this.pData["hid"] = this.hid;
    if(this.count == 1){
      this.button = "提交"
    }
    // if(this.isUpdate != null) {
    //   this.button = "返回"
    // }
  }

  ionViewWillLeave() {
    for (var key in this.toAnswer) {
      this.tArr.push(key);
      this.aArr.push(this.toAnswer[key]);

    }
    localStorage.setItem(this.cname, this.aArr);
    if (this.isUpdate == null){
      console.log("离开页面，提交数据");
      this.pData['tid'] = this.tArr;
      this.pData['ans'] = this.aArr;
      this.pData['count'] = this.count;
      this.appService.homeworkanswer(this.pData).then(
        res => {
          if(res.code==200){
            console.log("提交成功");
          }
          console.log(res)

        },
        error=>{
          // alert('错误')
          console.log(error)
        }
      )
    }

  }

  choseanswer(answer,tittleId){
    this.localAnswer[this.test_number - 1] = ''
    this.toAnswer[tittleId] = ''
    this.selectCoA = false;
    this.selectCoB = false;
    this.selectCoC = false;
    this.selectCoD = false;

    if (answer == 'A') {
      this.selectCoA = true;
    }
    if (answer == 'B') {
      this.selectCoB = true;
    }
    if (answer == 'C') {
      this.selectCoC = true;
    }
    if (answer == 'D') {
      this.selectCoD = true;
    }

    this.seAnswer = answer;
  }

  pAn(an,tittleId){
    this.localAnswer[this.test_number - 1] = ''
    this.toAnswer[tittleId] = ''
    this.pCoT = false;
    this.pCoF = false;

    if (an == '1'){
      this.pCoT = true;
    } else this.pCoF = true;

    this.pAnswer = an;

  }
  itemSelected(){
    this.app.getRootNav().push('PagedetailPage');

  }

  // 跳转到下一页 或返回知识点列表
  nextSubject(type,titleid){
    this.selectCoA = false;
    this.selectCoB = false;
    this.selectCoC = false;
    this.selectCoD = false;
    this.pCoT = false;
    this.pCoF = false;

    if (this.localAnswer[this.test_number-1] != ''){
      console.log(type+this.tiankong)
      if (type == 1 || 3){
        this.toAnswer[titleid] = this.localAnswer[this.test_number-1];
      }
      if (type == 2){
        if (this.tiankong == null) {
          this.toAnswer[titleid] = this.localAnswer[this.test_number-1];
        }else {
          console.log("更新填空")
          this.toAnswer[titleid] = this.tiankong;
          this.tiankong = ''
        }
      }
      if (type == 2){
        if (this.jieda == null) {
          this.toAnswer[titleid] = this.localAnswer[this.test_number-1];
        }else {
          console.log("更新解答")
          this.toAnswer[titleid] = this.jieda;
          this.jieda = ''
        }
      }
    }else if (type == 1) {
      this.toAnswer[titleid] = this.seAnswer;
      this.seAnswer = ''
    }else if (type == 2) {
      console.log("填空")
      this.toAnswer[titleid] = this.tiankong;
      this.tiankong = ''
    }else if (type == 3) {
      this.toAnswer[titleid] = this.pAnswer;
      this.pAnswer = ''
    }else if (type == 4) {
      this.toAnswer[titleid] = this.jieda;
      this.jieda = ''
    }
    if (this.test_number == this.count - 1) {
      this.button = "提交";
    }
    if (this.isUpdate != null && this.test_number == this.count - 1){
      this.button = '返回'
    }
    if (this.test_number < this.count) {
      this.test_number ++;


    } else {
      this.navCtrl.pop();
    }


  }

  swipeEvnet(event,type,titleid) {
    //向左滑下一题
    if (event.direction == 2) {
      this.selectCoA = false;
      this.selectCoB = false;
      this.selectCoC = false;
      this.selectCoD = false;
      this.pCoT = false;
      this.pCoF = false;

      if (this.localAnswer[this.test_number-1] != ''){
        console.log(type+this.tiankong)
        if (type == 1 || 3){
          this.toAnswer[titleid] = this.localAnswer[this.test_number-1];
        }
        if (type == 2){
          if (this.tiankong == null) {
            this.toAnswer[titleid] = this.localAnswer[this.test_number-1];
          }else {
            console.log("更新填空")
            this.toAnswer[titleid] = this.tiankong;
            this.tiankong = ''
          }
        }
        if (type == 2){
          if (this.jieda == null) {
            this.toAnswer[titleid] = this.localAnswer[this.test_number-1];
          }else {
            console.log("更新解答")
            this.toAnswer[titleid] = this.jieda;
            this.jieda = ''
          }
        }
      }else if (type == 1) {
        this.toAnswer[titleid] = this.seAnswer;
        this.seAnswer = ''
      }else if (type == 2) {
        console.log("填空")
        this.toAnswer[titleid] = this.tiankong;
        this.tiankong = ''
      }else if (type == 3) {
        this.toAnswer[titleid] = this.pAnswer;
        this.pAnswer = ''
      }else if (type == 4) {
        this.toAnswer[titleid] = this.jieda;
        this.jieda = ''
      }
      if (this.test_number == this.count - 1) {
        this.button = "提交";
      }
      if (this.isUpdate != null && this.test_number == this.count - 1){
        this.button = '返回'
      }
      if (this.test_number < this.count) {
        this.test_number ++;


      } else {
        this.navCtrl.pop();
      }
    }
    //向右滑上一题
    if(event.direction==4) {
      console.log(this.test_number)
      this.selectCoA = false;
      this.selectCoB = false;
      this.selectCoC = false;
      this.selectCoD = false;
      this.pCoT = false;
      this.pCoF = false;
      if (this.test_number == this.count) {
        this.button = "下一题";
      }
      if (this.test_number == this.count) {
        if (type == 1) {
          this.toAnswer[titleid] = this.seAnswer;
          this.seAnswer = ''
        } else if (type == 2) {
          this.toAnswer[titleid] = this.tiankong;
        } else if (type == 3) {
          this.toAnswer[titleid] = this.pAnswer;
        } else if (type == 4) {
          this.toAnswer[titleid] = this.jieda;
        }
      }

      if (this.test_number == 1) {

      }else {
        this.test_number --;
      }
    }
  }

  //跳转到上一题
  leftSubject(type,titleid) {
    console.log(this.test_number)
    this.selectCoA = false;
    this.selectCoB = false;
    this.selectCoC = false;
    this.selectCoD = false;
    this.pCoT = false;
    this.pCoF = false;
    if (this.test_number == this.count) {
      this.button = "下一题";
    }
    if (this.test_number == this.count) {
      if (type == 1) {
        this.toAnswer[titleid] = this.seAnswer;
        this.seAnswer = ''
      } else if (type == 2) {
        this.toAnswer[titleid] = this.tiankong;
      } else if (type == 3) {
        this.toAnswer[titleid] = this.pAnswer;
      } else if (type == 4) {
        this.toAnswer[titleid] = this.jieda;
      }
    }

    if (this.test_number == 1) {

    }else {
      this.test_number --;
    }
  }
  //跳转到下一个页面
  nextPage(){
    this.app.getRootNav().push('PageexamPage');

  }






}
