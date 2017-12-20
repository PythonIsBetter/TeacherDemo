import { Injectable,EventEmitter}    from '@angular/core';
import { Headers,Http,RequestOptions,Response} from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import { BASEURL,TOREBASEURL} from './theme.config';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
let headers = new Headers({ 'Content-Type': 'application/json' }); //其实不表明 json 也可以, ng 默认好像是 json
// let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
// let headers = new Headers({ 'Accept':  "application/json; charset=utf-8"});
let options = new RequestOptions({ headers: headers });
@Injectable()
export class AppService {
      setNetworkTag: EventEmitter<number>;
    constructor(private http: Http) {
      this.setNetworkTag = new EventEmitter();
    }
    private extractData(res: Response) {
      let body = res.json();
      // return body.data || { };
      return body  || { };
    }
    private handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Promise.reject(errMsg);
    }
    textpost(): Promise<any> {
       return this.http
        .post('https://jsonplaceholder.typicode.com/posts/', JSON.stringify({}),options)
        .toPromise()
          .then(this.extractData)
        .catch(this.handleError);
    }
    userlogin(data): Promise<any> {//用户登录
      // mobile	是	string	手机号
      // password	是	string	密码
      return this.http
       .post(BASEURL+'/user/login', JSON.stringify(data),options)
       .toPromise()
         .then(this.extractData)
       .catch(this.handleError);
   }
   searchlession(data): Promise<any> {//搜索录播课课程
    // sid	否	string	非必填，录播课id
    // name	是	string	录播课名称关键字
    return this.http
     .post(BASEURL+'/search/lession', JSON.stringify(data),options)
     .toPromise()
       .then(this.extractData)
     .catch(this.handleError);
 }
    indexguide(data): Promise<any> {//考试指南
    // sid	否	string	非必填，录播课id
    // name	是	string	录播课名称关键字
    return this.http
     .post(BASEURL+'/index/guide', JSON.stringify(data),options)
     .toPromise()
       .then(this.extractData)
     .catch(this.handleError);
 }
     indexindex(data): Promise<any> {//考试指南详情
    // sid	否	string	非必填，录播课id
    // name	是	string	录播课名称关键字
    return this.http
     .post(BASEURL+'/index/index', JSON.stringify(data),options)
     .toPromise()
       .then(this.extractData)
     .catch(this.handleError);
 }
 tapelessionsteportop(data): Promise<any> {//学生对评论进行赞或踩
  return this.http
   .post(BASEURL+'/tape-lession/step-or-top', JSON.stringify(data),options)
   .toPromise()
     .then(this.extractData)
   .catch(this.handleError);
}

   //reset-pwd
      userresetpwd(data): Promise<any> {//用户注册
    // mobile	是	string	手机号码
    // password	是	string	密码
    // code	否	string	短信验证码
    return this.http
     .post(BASEURL+'/user/reset-pwd', JSON.stringify(data),options)
     .toPromise()
       .then(this.extractData)
     .catch(this.handleError);
 }
   userregister(data): Promise<any> {//用户注册
    // mobile	是	string	手机号码
    // password	是	string	密码
    // code	否	string	短信验证码
    return this.http
     .post(BASEURL+'/user/register', JSON.stringify(data),options)
     .toPromise()
       .then(this.extractData)
     .catch(this.handleError);
 }
 usermodifypwd(data): Promise<any> {//重置密码
  // tokenId	否	string	tokenId
  return this.http
   .post(BASEURL+'/user/modify-pwd', JSON.stringify(data),options)
   .toPromise()
     .then(this.extractData)
   .catch(this.handleError);
}
  usersendsms(data): Promise<any> {//发送验证码
    // mobile	是	string	手机号码
    return this.http
     .post(BASEURL+'/user/send-sms', JSON.stringify(data),options)
     .toPromise()
       .then(this.extractData)
     .catch(this.handleError);
  }
  explainindex(): Promise<any> {//精讲页面
       return this.http
        .post(BASEURL+'/explain/index', JSON.stringify({}),options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
    tapelessiondetail(data): Promise<any> {//录播课详情
      // id	是	int	课程id
       return this.http
        .post(BASEURL+'/tape-lession/detail', JSON.stringify(data),options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
  subjectindex(): Promise<any> {//科目列表
       return this.http
        .post(BASEURL+'/subject/index', JSON.stringify({}),options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
  tapelessionpointexam(data): Promise<any> {//断点试题列表
    // id	是	断点id	用户名
       return this.http
        .post(BASEURL+'/tape-lession/point-exam', JSON.stringify(data),options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
  tapelessionviewposition(data): Promise<any> {//标记视频观看位置
//     tokenId	是	string	tokenId
// lid	是	int	录播课id
// pos	否	int	录播课位置
       return this.http
        .post(BASEURL+'/tape-lession/view-position', JSON.stringify(data),options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
  tapelessioncomments(data): Promise<any> {//录播课评论列表
    // id	是	int	录播课id
       return this.http
        .post(BASEURL+'/tape-lession/comments', JSON.stringify(data),options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
    tapelessionpushcomment(data): Promise<any> {//学生发表评论
//       cid	是	int	录播课id
// detail	是	string	评论内容
// score	否	int	评分
       return this.http
        .post(BASEURL+'/tape-lession/push-comment', JSON.stringify(data),options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
      tapelessiontapetest(data): Promise<any> {//获取录播课视频播放完成之后测试题
// id	是	int	录播课视频id
       return this.http
        .post(BASEURL+'/tape-lession/tape-test', JSON.stringify(data),options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
    explainrecommendtaped(data): Promise<any> {//下拉更新数据
//       page	否	int	第几页 默认1
// num	否	int	每页显示多少个,默认20
// sort	是	int	排序方式，又首页接口返回的sortby
       return this.http
        .post(BASEURL+'/explain/recommend-taped', JSON.stringify(data),options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }
  tapelessionindex(data): Promise<any> {//录播课视频列表
    // sid	是	string	科目id，默认是1
    // num	是	integer	数量
    // page	否 integer	第几页,默认是1
    return this.http
     .post(BASEURL+'/tape-lession/index', JSON.stringify(data),options)
     .toPromise()
     .then(this.extractData)
     .catch(this.handleError);
}
  indexplayvideourl(data): Promise<any> {//录播课视频列表
    // id	是	string	视频id
    return this.http
     .post(BASEURL+'/index/play-video-url', JSON.stringify(data),options)
     .toPromise()
     .then(this.extractData)
     .catch(this.handleError);
}

  homeworkanswer(data): Promise<any>  { //作业答案提交

    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });

    return new Promise((resolve, reject) => {
      this.http.post("http://101.201.238.157/demo/index/post_homework",JSON.stringify(data) , options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })


  }
  changeInfo(data): Promise<any>  { //修该信息

    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });

    return new Promise((resolve, reject) => {
      this.http.post("http://101.201.238.157/demo/index/post_user_info",JSON.stringify(data) , options )
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })


  }

  myViewTaped(data): Promise<any> {//看过的录播课视频列表
    // num	是	integer	数量
    // page	否 integer	第几页,默认是1
    return this.http
      .post(BASEURL+'/my/view-taped', JSON.stringify(data),options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
}
