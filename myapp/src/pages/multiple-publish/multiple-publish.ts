import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http, Response} from "@angular/http";

/**
 *多重发布，允许一个作业或者是一个通知发布到多个班级里
 */

@IonicPage()
@Component
({
  selector: 'page-multiple-publish',
  templateUrl: 'multiple-publish.html',
})
export class MultiplePublishPage
{
  type:number;//类型，判断当前要发布的是作业还是通知，0是作业，1是通知
  homeworkName:string;//作业名称，传到服务器上的
  class:Array<{id:String,name:String}>;//班级列表
  otherClass:Array<string>;//多选班级列表

  constructor(public navCtrl: NavController, public navParams: NavParams,public http :Http,public toastCtrl: ToastController)
  {
    this.type = navParams.get('type');//接受类型，0是作业，1是通知
    this.homeworkName = navParams.get('homeworkName');//接受得到作业名字
    this.class = [];//初始化
    this.otherClass=[];//初始化
    this.loadClass();
  }


  ionViewDidLoad()
  {
    console.log('ionViewDidLoad MultiplePublishPage');
  }

  loadClass()//加载班级列表
  {
    this.http.request('http://222.73.69.146:8088/index.php/demo/index/cla_select')
      .subscribe((res:Response)=>
      {
        for(let i=0;i<res.json().data.length;i++)
        {
          this.class.push
          ({
            id:res.json().data[i].id,
            name:res.json().data[i].name,
          });
        }
      });
  }

  changeTheValue(id)//动态获取多选框的值
  {
    this.otherClass.push(id);
  }

  publishHomeWork()//上载作业
  {
    if(this.otherClass[0]!=null)
    {
      for(let i=0;i<this.otherClass.length;i++)
      {
        this.http.request("http://222.73.69.146:8088/index.php/demo/index/addHomeworkList?name="+this.homeworkName+"&classid="+this.otherClass[i])
          .subscribe((res: Response) =>
          {
            if(res.json().data=="1")
            {
              let toast = this.toastCtrl.create
              ({
                message: '添加成功',
                duration: 2000,
                position:'middle'
              });
              toast.present();
            }
            else
              {
              let toast = this.toastCtrl.create
              ({
                message: '添加失败',
                duration: 2000,
                position:'middle'
              });
              toast.present();
            }
          });
      }
    }

    this.http.get("http://222.73.69.146:8088/index.php/demo/index/publishHomework?name="+this.homeworkName).subscribe(res=>
    {
      if (res.json().data == "1")
      {
        let toast = this.toastCtrl.create
        ({
          message: '发布成功',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      else
      {
        let toast = this.toastCtrl.create
        ({
          message: '发布失败',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    });
  }

}
