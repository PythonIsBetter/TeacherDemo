import {Component, Inject} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Response, Http} from "@angular/http";
/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {

  // 接收题目
  test: Object;
  // 接收作业id
  hid: any;
  // 接收知识点名字
  cname:string;
  //登录用户ID
  user: String;
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

  constructor(@Inject('appService') private appService,public navCtrl: NavController, public navParams: NavParams,private  http: Http,public app: App) {
    this.test_number = 1;
    this.hid = navParams.get("hid");
    this.cname = navParams.get("subject");
    this.user = navParams.get('uid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MistakeDetailPage');
    this.http.request("http://222.73.69.146:8088/index.php/index/request_homework_test/"+ this.hid)
      .subscribe((res: Response) => {
        this.test = res.json();
        console.log(this.test);
        this.count = res.json().length;
      });
    this.pData["userid"] = this.user;
    this.pData["hid"] = this.hid;
  }

  ionViewWillLeave() {
    console.log("离开页面，提交数据");
    for (var key in this.toAnswer) {
      this.tArr.push(key);
      this.aArr.push(this.toAnswer[key]);
    }
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

  choseanswer(answer){
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

  pAn(an){
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

    if (type == 1) {
      this.toAnswer[titleid] = this.seAnswer;
    } else if (type == 2) {
      this.toAnswer[titleid] = this.tiankong;
    } else if (type == 3) {
      this.toAnswer[titleid] = this.pAnswer;
    } else if (type == 4) {
      this.toAnswer[titleid] = this.jieda;
    }
    if (this.test_number == this.count - 1) {
      this.button = "提交";

    }
    if (this.test_number < this.count) {
      console.log(this.count);
      this.test_number ++;


    } else {
      this.navCtrl.pop();
    }


  }

  //跳转到上一题
  leftSubject() {
    if (this.test_number == 1) {

    }else {
      this.test_number --;
    }
  }

  add(){
    //将题添加到后台数ll据库中 sfds
    alert("收藏成功");
    this.http.request('http://222.73.69.146:8088/index.php/demo/index/collect').subscribe();

  }

  //跳转到下一个页面
  nextPage(){
    this.app.getRootNav().push('PageexamPage');

  }

}
