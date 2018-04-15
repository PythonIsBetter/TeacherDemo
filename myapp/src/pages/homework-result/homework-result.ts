import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http, Response} from "@angular/http";

declare let echarts;

/**
 * 上一个页面：homeworkDetailList
 * 题号页面点进去后，显示结果的界面
 * 下一个界面：homeworkResult
 * */

@IonicPage()
@Component({
  selector: 'page-homework-result',
  templateUrl: 'homework-result.html',
})
export class HomeworkResultPage
{
  @ViewChild('container1') container:ElementRef;//与html中div #container1对应
  chart :any;
  id:number;//作业号
  titleID:number;//题号
  numRight:number;//做对的数量
  numWrong:number;//做错的数量
  num:number;//题目总数
  rateRight:number;//正确率
  rateWrong:number;//错误率
  kind:number;//题目类型
  question:Array<{id:number,question:string,A:string,B:string,C:string,D:string,answer:string}>;//题目（题号+题目+选项+选项+选项+选项+答案）

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController)
  {
    this.id = navParams.get('id');//题号
    this.titleID=navParams.get('titleID');
    this.kind=0;
    this.question=[];
    this.loadQuestion();
  }

  //初始化
  ionViewDidLoad()
  {
   // 加载做题结果http://47.100.203.126:81/index.php/index/request_record_list/5/1
    this.http.request("http://47.100.203.126:81/index.php/demo/index/getQuesMessageByHomeId?homeid="+this.id+"&quesid="+this.titleID).subscribe((res:Response)=>
    {
      this.numRight=res.json().data.countRight;
      this.numWrong=res.json().data.countWrong;
      this.num=this.numRight+this.numWrong;
    });
  }

  //加载题目详情
  loadQuestion()
  {
    this.http.request("http://47.100.203.126:81/index.php/demo/index/getQuesDetail?titleid="+this.titleID).subscribe((res:Response)=>
    {
      for(let i=0;i<res.json().data.length;i++)
      {
        //选择题
        if(res.json().data[i].type==1)
        {
          this.question.push
          ({
            id:res.json().data[i].titleId,//题号
            question:res.json().data[i].titleBody,//题目
            A:"A、 "+res.json().data[i].A,//选项们
            B:"B、 "+res.json().data[i].B,
            C:"C、 "+res.json().data[i].C,
            D:"D、 "+res.json().data[i].D,
            answer:res.json().data[i].answer,//答案
          });
          this.kind=1;
        }

        //非选择题
        else
          this.question.push
          ({
            id:res.json().data[i].titleId,//题号
            question:res.json().data[i].titleBody,//题目
            A:"",//选项们
            B:"",
            C:"",
            D:"",
            answer:res.json().data[i].answer,//答案
          });
      }
    });
  }

  ionViewDidEnter()
  {
    this.rateRight=this.numRight*100/this.num;
    this.rateWrong=100-this.numRight;

    let ctx = this.container.nativeElement;
    this.chart = echarts.init(ctx);
    this.chart.setOption(
      {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        title: {
          floating:true,
          text: '作业完成情况',
          left:'center',
        },
        series: [
          {
            name: '数据表示',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value:this.numRight,name: '正确率'},
              {value:this.numWrong,name: '错误率'},
            ]
          }
        ]
      }
    );
  }
}
