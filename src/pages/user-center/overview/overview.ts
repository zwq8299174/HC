import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppApi } from '../../../providers/app-api/app-api';

import {OverviewDetailPage}from './overview-detail/overview-detail';

@Component({
	selector: 'page-overview',
	templateUrl: 'overview.html',
})
export class OverviewPage {
	total:any={
		total_income:'',
		day_income:'',
		month_income:''
	}

	incomeDetail:any={
		//总-充值
		buy_member_total:'',
		//总-分润
		repayment_total:'',
		//总-分享
		//总-贷款
		//总-办卡


		//今日-充值
		buy_member_day:'',
		//今日-分润
		repayment_day:'',
		//今日-分享
		//今日-贷款
		//今日-办卡

		//本月-充值
		buy_member_month:'',
		//本月-分润
		repayment_month:''
		//本月-分享
		//本月-贷款
		//本月-办卡
	}
	
	

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public appApi:AppApi
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OverviewPage');
	}
	
	ionViewDidEnter() {
		//加载详情总数据
		this.appApi.acctIncomeQuery().subscribe(data => {
			this.total = data;
		});
		//加载本月收益、加载今日收益、加载总收益
		this.appApi.acctIncomeByTypeQuery().subscribe(data => {
			this.incomeDetail = data;
		});

	}

	/**
	 * 去详情页面
	 */
	goDetail():void{
		this.navCtrl.push(OverviewDetailPage);
	}
}
