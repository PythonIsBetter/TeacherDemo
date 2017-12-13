import {Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StuPrePage} from "../stu-pre/stu-pre";
import {SubItemPage} from "../sub-item/sub-item";
import {Http, Response} from "@angular/http";
import {HomeworkForStudentPage} from "../homework-for-student/homework-for-student";
declare var echarts;
/**
 * Generated class for the StuConPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stu-con',
  templateUrl: 'stu-con.html',
})
export class StuConPage {
  @ViewChild('container1') container:ElementRef;//与html中div #container1对应

  classes:Array<{id:String,name:String,subject:String,head:String}>;
  classid:string;
  chart :any;
  chart1:any;
  chart2:any;
  chart3:any;
  chart4:any;
  student:any;
  num:number;


  tests:Array<{id:string,name:string,num:string}>;
  homeworkDetail:Array<{right:string,wrong:string,all:string}>;
  urlGetHomeworkList;string;
  homework:Array<{id:string,name:string}>;
  practiceDetail:Array<{right:string,wrong:string,all:string}>;
  practice:Array<{name:string}>;
  urlGetStuPracticeMark:string;
  urlGetStuMathPracticeMark:string;
  urlGetHomeworkMarkByClassid: string;
 // test:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http) {
    this.tests=[];
    this.homework=[];
    this.homeworkDetail=[];
    this.practiceDetail=[];
    this.practice=[];
    this.classes=[];

    this.classid=navParams.get('item2').id;
    this.student = navParams.get('item');

    this.urlGetHomeworkList="http://101.201.238.157/demo/index/getHomeworkList";
    this.urlGetHomeworkList+="?classid="+this.classid;

    this.urlGetHomeworkMarkByClassid = "http://101.201.238.157/demo/index/getHomeworkMarkByClassid";
    this.urlGetHomeworkMarkByClassid += "?stuid=" + this.student.id + "&classid=" +this.classid;


    //this.url="http://localhost:8090/public/admin/index/insert";
    //this.url="http://101.201.238.157/demo/index/cla_insert";
    // this.homework.push({
    //   id:"123",
    //   name:"lalala"
    // });
    this.practice.push({
      name:"语文"
    },{
      name:"数学"

    },{
      name:"英语"
    })

    this.http.request(this.urlGetHomeworkList)
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().data.length;i++)
        {
          this.homework.push({
            id:res.json().data[i].id,
            name:res.json().data[i].name
          });
        }
        this.num=res.json().data.length;
      });

      this.http.request(this.urlGetHomeworkMarkByClassid)
        .subscribe((res:Response)=>{
          for(let i=0;i<res.json().data.length;i++)
          {
            this.homeworkDetail.push({
              right:res.json().data[i].right,
              wrong:res.json().data[i].wrong,
              all:res.json().data[i].all
            });
          }
        });

      for (let j=1;j<4;j++) {
        this.urlGetStuPracticeMark = "http://101.201.238.157/demo/index/getStuPracticeMark";
        this.urlGetStuPracticeMark += "?stuid=" + this.student.id + "&subid="+j;
        this.http.request(this.urlGetStuPracticeMark)
          .subscribe((res: Response) => {
            for (let i = 0; i < 1; i++)
            {
              this.practiceDetail.push({
                right:res.json().data.right,
                wrong:res.json().data.wrong,
                all:res.json().data.all
              });
            }
          });
      }


    this.tests.push({
      id:"1",
      name:"语文专项练习",
      num:"75"
    },
      {
        id:"2",
        name:"数学专项练习",
        num:"50"
      },
      {
        id:"12345",
        name:"真题卷一",
        num:"100"
      },
      {
        id:"12345",
        name:"模拟试卷一",
        num:"75"
      },
      {
        id:"12345",
        name:"模拟试卷二",
        num:"50"
      }
    );

  }

  itemTapped(event, item,item2) {
    this.navCtrl.push(StuPrePage, {
      item: item,
      item2:item2
    });
  }

  itemTapped2(event, item,item2,homework) {
    this.navCtrl.push(HomeworkForStudentPage, {
      item: item,
      item2:item2,
      homework:homework
    });
  }

  itemTapped1(event, item,item2) {
    this.navCtrl.push(SubItemPage, {
      item: item,
      item2:item2
    });
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter(){
    console.log('ionViewDidLoad StuConPage');
    console.log(this.homeworkDetail[0]);
    for(let i=0;i<this.num;i++){
      var t="chart"+i;
      this.chart = echarts.init(document.getElementById(t));
      this.chart.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },

          title: {
            floating:true,
            text:
            parseInt(this.homeworkDetail[i].right)/parseInt(this.homeworkDetail[i].all)*100+"%",
            left:'center',
            top:'center',
            fontSize:5
          },
          series: [
            {
              name: '详细情况',
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
                {value: parseInt(this.homeworkDetail[i].right), name: '正确'},
                {value: parseInt(this.homeworkDetail[i].wrong), name: '错误'},
                {value: 100-parseInt(this.homeworkDetail[i].wrong)-parseInt(this.homeworkDetail[i].right), name: '未做'}
              ],
            }
          ],
          color: ['#3CB371','#DC143C','#c4ccd3','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83']
        }
      );
    }

    for(let i=0;i<3;i++){
      var r="pie"+i;
      this.chart = echarts.init(document.getElementById(r));
      this.chart.setOption(
        {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },

          title: {
            floating:true,
            text: parseInt(this.practiceDetail[i].right)/parseInt(this.practiceDetail[i].all)*100+"%",
            left:'center',
            top:'center',
            fontSize:5
          },
          series: [
            {
              name: '详细情况',
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
                {value: parseInt(this.practiceDetail[i].right), name: '正确'},
                {value: parseInt(this.practiceDetail[i].wrong), name: '错误'},
                {value: 100-parseInt(this.practiceDetail[i].wrong)-parseInt(this.practiceDetail[i].right), name: '未做'}
              ],
            }
          ],
          color: ['#3CB371','#DC143C','#c4ccd3','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83']
        }
      );
    }




  }
}
