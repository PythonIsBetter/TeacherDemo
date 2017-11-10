import {Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StuPrePage} from "../stu-pre/stu-pre";
import {SubItemPage} from "../sub-item/sub-item";
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
  chart :any;
  chart1:any;
  chart2:any;
  chart3:any;
  chart4:any;
  student:any;
  // test1:string;
  // test2:string;
  // exam1:string;
  // exam2:string;
  // exam3:string;
  tests:Array<{id:string,name:string,num:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tests=[];
    this.student = navParams.get('item');

    // this.test1="75";
    // this.test2="50";
    // this.exam1="100";
    // this.exam2="75";
    // this.exam3="50";
    this.tests.push({
      id:"1",
      name:"专项练习一",
      num:"75"
    },
      {
        id:"2",
        name:"专项练习二",
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
    )
  }

  itemTapped(event, item,item2) {
    this.navCtrl.push(StuPrePage, {
      item: item,
      item2:item2
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
