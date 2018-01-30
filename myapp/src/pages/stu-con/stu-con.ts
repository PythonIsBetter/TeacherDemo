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
  @ViewChild('container2') container1:ElementRef;//与html中div #container1对应
  @ViewChild('container3') container2:ElementRef;//与html中div #container1对应
  @ViewChild('container4') container3:ElementRef;//与html中div #container1对应
  @ViewChild('container5') container4:ElementRef;//与html中div #container1对应
  classes:Array<{id:String,name:String,subject:String,head:String}>;
  classid:string;
  chart :any;
  chart1:any;
  chart2:any;
  chart3:any;
  chart4:any;
  student:any;
  num:number;
  // test1:string;
  // test2:string;
  // exam1:string;
  // exam2:string;
  // exam3:string;
  tests:Array<{id:string,name:string,num:string}>;
  urlGetHomeworkList;string;
  homework:Array<{id:string,name:string}>;
  homeworkMark:Array<{right:string,wrong:string,all:string}>
  urlGetStuPracticeMark:string;
  urlGetStuMathPracticeMark:string;
  urlGetStuHomeworkMark:string;
  urlGetStuHomeworkMark1:string;
 test:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http) {
    this.tests=[];

    this.homework=[];
    this.student = navParams.get('item');
    this.classes=[];
    this.classid=navParams.get('item2').id;
    this.urlGetStuPracticeMark="http://101.201.238.157/demo/index/getStuPracticeMark";
    this.urlGetHomeworkList="http://101.201.238.157/demo/index/getHomeworkList";
    this.urlGetStuHomeworkMark="http://101.201.238.157/demo/index/getStuHomeworkMark"
    this.urlGetHomeworkList+="?classid="+this.classid;
    this.urlGetStuMathPracticeMark=this.urlGetStuPracticeMark+"?stuid="+this.student.id+"&subid="+"2";
    this.urlGetStuHomeworkMark=this.urlGetStuHomeworkMark+"?stuid="+this.student.id;
    //this.url="http://localhost:8090/public/admin/index/insert";
    //this.url="http://101.201.238.157/demo/index/cla_insert";
    // this.homework.push({
    //   id:"123",
    //   name:"lalala"
    // });
    this.http.request(this.urlGetStuMathPracticeMark)
      .subscribe((res:Response)=>{
       this.test=res.json().data.right;

      });

    this.http.request(this.urlGetHomeworkList)
      .subscribe((res:Response)=>{
        for(let i=0;i<res.json().data.length;i++)
        {
          this.homework.push({
            id:res.json().data[i].id,
            name:res.json().data[i].name
          });
         // this.urlGetStuHomeworkMark1=this.urlGetStuHomeworkMark+"&homeid="+this.homework[i].id;
         //  this.http.request(this.urlGetStuHomeworkMark1)
         //    .subscribe((res:Response)=>{
         //     this.test.push(res.json().data.right);
         //
         //    });
        }
        this.num=res.json().data.length;
       // alert(this.urlGetStuHomeworkMark);
      });
    // this.test1="75";
    // this.test2="50";
    // this.exam1="100";
    // this.exam2="75";
    // this.exam3="50";
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
    // alert(this.test);

  }

  ionViewWillEnter(){
    // alert(this.test);
  }

  ionViewDidEnter(){
 //  alert(this.homework[0].id);
   //  alert(this.test[0]);
    console.log('ionViewDidLoad StuConPage');
    // alert(this.num);
    for(let i=0;i<this.num;i++){
      var t="chart"+i;
      this.chart = echarts.init(document.getElementById(t));
      this.chart.setOption(
        {
          clockWise:false,
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },

          title: {
            floating:true,
            text: parseInt(this.tests[1].num)+"%",
            left:'center',
            top:'center',
            fontSize:6
          },
          series: [
            {
              name: '访问来源',
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
                {value: parseInt(this.tests[1].num), name: ''},
                {value: 100-parseInt(this.tests[1].num), name: ''}
              ],
              color:['#7EC0EE', '#D0D0D0','yellow','blueviolet']

            }
          ]
        }
      );
    }

    let ctx = this.container.nativeElement;
    this.chart = echarts.init(ctx);
    this.chart.setOption(
      {
        clockWise:false,
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        title: {
          floating:true,
          text: parseInt(this.tests[1].num)+"%",
          left:'center',
          top:'center',
          fontSize:6
        },
        series: [
          {
            name: '访问来源',
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
              {value: parseInt(this.tests[1].num), name: ''},
              {value: 100-parseInt(this.tests[1].num), name: ''}
            ],
            color:['#7EC0EE', '#D0D0D0','yellow','blueviolet']

          }
        ]
      }
    );
    let ctx1 = this.container1.nativeElement;
    this.chart1 = echarts.init(ctx1);
    this.chart1.setOption(
      {
        clockWise:false,
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        title: {
          floating:true,
          text: parseInt(this.tests[0].num)+"%",
          left:'center',
          top:'center',
          fontSize:6
        },
        series: [
          {
            name: '访问来源',
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
              {value: parseInt(this.tests[0].num), name: ''},
              {value: 100-parseInt(this.tests[0].num), name: ''}
            ],
            color:['#7EC0EE', '#D0D0D0','yellow','blueviolet']

          }
        ]
      }
    );
    let ctx2 = this.container2.nativeElement;
    this.chart2 = echarts.init(ctx2);
    this.chart2.setOption(
      {
        clockWise:false,
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        title: {
          floating:true,
          text: parseInt(this.tests[2].num)+"%",
          left:'center',
          top:'center',
          fontSize:6
        },
        series: [
          {
            name: '访问来源',
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
              {value: parseInt(this.tests[2].num), name: ''},
              {value: 100-parseInt(this.tests[2].num), name: ''}
            ],
            color:['#FFD306', '#D0D0D0','yellow','blueviolet']

          }
        ]
      }
    );
    let ctx3 = this.container3.nativeElement;
    this.chart3 = echarts.init(ctx3);
    this.chart3.setOption(
      {
        clockWise:false,
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        title: {
          floating:true,
          text: parseInt(this.tests[3].num)+"%",
          left:'center',
          top:'center',
          fontSize:6
        },
        series: [
          {
            name: '访问来源',
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
              {value: parseInt(this.tests[3].num), name: ''},
              {value: 100-parseInt(this.tests[3].num), name: ''}
            ],
            color:['#FFD306', '#D0D0D0','yellow','blueviolet']

          }
        ]
      }
    );
    let ctx4 = this.container4.nativeElement;
    this.chart4 = echarts.init(ctx4);
    this.chart4.setOption(
      {
        clockWise:false,
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        title: {
          floating:true,
          text: parseInt(this.tests[4].num)+"%",
          left:'center',
          top:'center',
          fontSize:6
        },
        series: [
          {
            name: '访问来源',
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
              {value: parseInt(this.tests[4].num), name: ''},
              {value: 100-parseInt(this.tests[4].num), name: ''}
            ],
            color:['#FFD306', '#D0D0D0','yellow','blueviolet']

          }
        ]
      }
    );
  }
}
