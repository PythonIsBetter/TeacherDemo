import {Component, ViewChild, ElementRef} from '@angular/core';
import { NavController } from 'ionic-angular';
declare var echarts;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('container1') container:ElementRef;//与html中div #container1对应
  chart :any;

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {

    let ctx = this.container.nativeElement;
    this.chart = echarts.init(ctx);
    this.chart.setOption(
      {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          confine: true
        },

        /*visualMap: [{
          inRange: {
            color: ['white', 'green', 'blue'],
            symbolSize: [30, 100]
          },
          type: 'piecewise',

        }],*/
        title: {
          floating:true,
          text: '圆心显示的标题',
          left:'center',
          top:'center',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
            ]
          }
        ],
        color: ['#3CB371','#DC143C','#c4ccd3','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570']
      }
    );

    // $('#p').html("hwphvaovj");        jquery 使用

  }

}
