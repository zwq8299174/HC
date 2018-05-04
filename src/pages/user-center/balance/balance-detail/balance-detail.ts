import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import * as moment from 'moment'

import { AppApi } from '../../../../providers/app-api/app-api';




@Component({
	selector: 'page-balance-detail',
	templateUrl: 'balance-detail.html',
})
export class BalanceDetailPage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private loadingCtrl:LoadingController
	) { }

	paymentList: any[] = [];
	detailModel: any = {
		after_acc: '',//交易后金额
		allpagenum: '',//页数
		amount: '',//交易金额
		attr_code: '',//账户属性编码 recharge 余额充值 profit 分润 withdraw 提现
		attr_sub_code: '',//分润子属性 buyMember 购买会员(充值) repayment 还款计划 collect 收款 withdraw 提现
		create_date: '',//创建日期

	};
	titleList: any[] = [{
		name:'收支明细',
		attr_type:''
	},{
		name:'收入明细',
		attr_type:'income'
	},{
		name:'支出明细',
		attr_type:'expenditure'
	}];
	titleType:string = '';
	
	pageType:any = '0';//记录显示明细页的type，'0'是默认，'1'=分润明细 '2'=充值明细  '3'=提现明细 
	profitType:any;

	currentPage:any = 0; //当前页数
	allpagenum:string; //总页数
	myDate:string; //选中日期
	maxDate:string;//最大日期

	loading:any;

	ionViewDidLoad() {
		console.log('ionViewDidLoad BalanceDetailPage');
		this.pageType = this.navParams.data.pageType;
		this.profitType = this.navParams.data.profitType;
		this.loading = this.loadingCtrl.create({});
	}

	ionViewDidEnter() {
		console.log('ionViewDidEnter BalanceDetailPage');
		console.log(this.navParams);
		this.getAcctDetailQuery();
		this.maxDate = moment().add(5,'years').format('YYYY-MM');
	}
	

	dateChange():void{
		this.initData();
		this.getAcctDetailQuery();
		
	}
	titleChange():void{
		this.myDate =undefined;
		this.initData();
		this.getAcctDetailQuery();
	}
	initData(){
		this.currentPage = 0;
		this.paymentList = [];
		this.loading = this.loadingCtrl.create({});
	}

	//收支明细请求接口
	getAcctDetailQuery(): void {
		console.log('getAcctDetailQuery');
		if (this.currentPage > this.allpagenum)return;
		
		let param: any = {};
		param.page = this.currentPage;
		param.yearmonth =this.myDate;

		if (this.pageType == '0') {
			param.attr_type = this.titleType;
		}else{
			param.attr_code = this.profitType;
		}
		console.log(param);
		this.loading.present();
		this.appApi.acctDetailQuery(param).subscribe(data => {
			console.log(data);
			this.loading.dismiss();
			if (data) {
				console.log(data.detail_list);
				this.paymentList = this.paymentList.concat(data.detail_list);
				this.allpagenum = data.allpagenum;
				this.currentPage ++;
			}
		});
	}



	loadMore():void{
		this.getAcctDetailQuery();
	}

	

}
