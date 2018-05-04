import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AppApi } from '../../../../providers/app-api/app-api';
import { ToasterProvider } from '../../../../providers/toaster/toaster';

/**
 * Generated class for the OverviewDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-overview-detail',
  templateUrl: 'overview-detail.html',
})
export class OverviewDetailPage {
  classify:string = "repayment"
  classifyAll:any[] = [
    { key: "buyMember", value: '充值收益' },
    { key: "repayment", value: '分润收益' },
    { key: "3", value: '分享收益' },
    { key: "4", value: '办卡收益' },
    { key: "5", value: '贷款收益' }
  ]
  //数组
  dataList:any[] = [];
  //当前第几页
  page:number = 0;
  //总页数
  allpagenum:number;
  //下拉按钮是否显示
  showCard:boolean;
  //下拉按钮描述
  describe:string = '下一页';
  //时间查询
  myDate:string;

  loading:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public appApi:AppApi,
    private toast: ToasterProvider,
    private loadingCtrl:LoadingController
  ) {}


  ionViewDidEnter(){
    this.page = 0;
    this.findAcctIncomeDetailQuery();
  }

  getAcctIncomeList():void{
    this.page = 0;
    this.findAcctIncomeDetailQuery();
  }
  /**
   * 获取明细记录
   */
  findAcctIncomeDetailQuery():void{
    this.loading = this.loadingCtrl.create({})
    this.loading.present();
    this.appApi.acctIncomeDetailQuery({
      profit_type : this.classify,
      yearmonth:this.myDate,
      page:this.page
    }).subscribe(data => {
      this.loading.dismiss();
      this.dataList = data.income_list;
      if(this.dataList.length>0){
        this.allpagenum = this.dataList[0].allpagenum;
        if(this.allpagenum == this.page+1){
            this.showCard = false;
        }else{
            this.showCard = true;
        }
      }else{
        this.showCard = false;
      }
    });
  }

  /**
   * 展示显示的页
   */
  nextPage():void{
    this.loading = this.loadingCtrl.create({})
    this.loading.present();

    this.page = this.page+1;
    if(this.allpagenum>this.page){
      this.appApi.acctIncomeDetailQuery({
        profit_type : this.classify,
        page:this.page
      }).subscribe(data => {
      this.loading.dismiss();
        this.dataList = this.dataList.concat(data.income_list);
        if(this.allpagenum = this.dataList[0].allpagenum){
          this.showCard = false;
        }
      });
    }else{
      this.showCard = false;
    }
  }

}
