import {Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  chart :any;
  chart1:any;
  student:any;
  test1:string;
  test2:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = navParams.get('item');
    this.test1="75";
    this.test2="50"
  }

  ionViewDidLoad() {
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
          text: parseInt(this.test2)+"%",
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
              {value: parseInt(this.test2), name: ''},
              {value: 100-parseInt(this.test2), name: ''}
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
          text: parseInt(this.test1)+"%",
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
              {value: parseInt(this.test1), name: ''},
              {value: 100-parseInt(this.test1), name: ''}
            ],
            color:['#7EC0EE', '#D0D0D0','yellow','blueviolet']

          }
        ]
      }
    );
  }

}
