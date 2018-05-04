import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { App, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import * as moment from 'moment'
import { SelectCardPage } from '../public/select-card/select-card';
import { AppApi } from '../../providers/app-api/app-api';
import { ActivateMemberPage } from '../user-center/activate-member/activate-member';
import { ToolsProvider } from '../../providers/tools/tools';
import { UserModel } from '../../providers/model/user-model';
import { OpenMerchantPage } from '../user-center/open-merchant/open-merchant';
import { RepayListPage } from './repay-list/repay-list';
import { ToasterProvider } from '../../providers/toaster/toaster';
import { TabsChangeService } from '../../providers/service/tabs-change.service';
import { DealPasswordPage } from '../public/deal-password/deal-password';


@Component({
	selector: 'page-repayment',
	templateUrl: 'repayment.html',
})
export class RepaymentPage {
	@ViewChild('repayForm') repayForm: NgForm;
	rePayModel: any = {
		maxAmount: undefined,
		minAmount: undefined,
		repayTimes: '5',
	};
	card: any;
	startMinDate: string;
	startMaxDate: string;
	endMinDate: string;
	endMaxDate: string;
	minFee: undefined;
	remark: string; //GetSecurityDeposit接口 返回
	remarkHidden:boolean = true;//remark是否隐藏
	discountList:any[] = [];//比例集合
	discount:number;//比例

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private app: App,
		private appApi: AppApi,
		private tool: ToolsProvider,
		private toast: ToasterProvider,
		private storage: Storage,
		private tabsChangeService: TabsChangeService
	) {
		//订阅tabsChangeService
		this.tabsChangeService.tabsChangeEvent.subscribe(event => {
			this.switchTabs(event)

		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RepaymentPage');
		console.log(this.repayForm);


	}
	ionViewDidEnter() {
		console.log('ionViewDidEnter RepaymentPage');
		this.startMinDate = moment().format('YYYY-MM-DD');
		this.startMaxDate = moment().add(6, 'M').format('YYYY-MM-DD');
		this.endMinDate = moment().format('YYYY-MM-DD');
		this.endMaxDate = moment().add(56, 'd').format('YYYY-MM-DD');

	}
	/**
	 * 创建还款计划
	 *
	 * @memberof RepaymentPage
	 */
	creat(): any {
		console.log(this.card);
		let cardValid = this.card != undefined;
		let dateValid = moment(this.rePayModel.startDate).isBefore(this.rePayModel.endDate);

		let maxAmountValid = (this.rePayModel.maxAmount - this.rePayModel.minAmount) >= 0;

		// let repayTimesValid = (this.rePayModel.repayTimes >= 2 && this.rePayModel.repayTimes <= 10);

		if (this.repayForm.valid == true && cardValid == true && dateValid == true && maxAmountValid == true) {
			console.log('表单验证通过');
			let repaymentPlan: any = {
				end_time: this.rePayModel.endDate,
				plan_amount: this.rePayModel.amount,
				start_time: this.rePayModel.startDate,
				daily_pay_count: this.rePayModel.repayTimes,
				card_no: this.card.card_no,
				max_single_pay_amount: this.rePayModel.maxAmount,
				min_single_pay_amount: this.rePayModel.minAmount,
			}

			this.storage.remove('repaymentPlan');
			this.storage.set('repaymentPlan', repaymentPlan);

			this.pushPage();
		} else {
			console.log('表单验证未通过this.repayForm.valid = ' + this.repayForm.valid + '\ncardValid = ' + cardValid + '\ndateValid = ' + dateValid + '\nmaxAmountValid = ' + maxAmountValid);
			this.toast.show({
				message: '填写信息有误，请检查',
				duration: 3000
			});
		}
	}
	/**
	 * 根据用户信息push页面
	 *
	 * @memberof RepaymentPage
	 */
	pushPage(): void {
		let user: UserModel;
		this.storage.get('user').then((data) => {
			if (data) {
				user = data;
				console.log('user.is_active = ' + user.is_active + '\nuser.is_reg_mer = ' + user.is_reg_mer);

				if (user.is_active == '0') {//会员未激活
					// this.app.getRootNav().push(ActivateMemberPage);
					this.chooseNavPush(ActivateMemberPage);
				} else if (user.is_reg_mer == '0') {
					// this.app.getRootNav().push(OpenMerchantPage);
					this.chooseNavPush(OpenMerchantPage);
				} else {
					this.storage.get('repaymentPlan').then((repaymentData) => {
						this.appApi.createRepaymentPlan(repaymentData).subscribe(data => {
							if (data!=undefined){
								if (data.plan_id) {
									this.toast.show({
										message: '创建计划成功',
										duration:3000,
										callback: () => {
											// this.app.getRootNav().push(RepayListPage);
											this.chooseNavPush(RepayListPage);
										}
									});
								}else{
									this.toast.show({
										message: '创建计划失败',
										duration:3000,
										cssClass: 'danger'
									})
								}
							}
						});
					});
				}
			}
		});

		//清除数据
		this.clearingData();

	}

	chooseNavPush(page: any): void {
		if (this.navCtrl.parent) {
			this.app.getRootNav().push(page);
		} else {
			this.navCtrl.push(page);
		}
	}

	//清除数据
	clearingData(): void {
		this.card = undefined;
		this.repayForm.onReset();
	}
	/**
	 * 获取折扣列表
	 */
    getDiscountList():void{
		setTimeout(()=>{
			if(this.repayForm.controls.repayAmount.valid&&this.repayForm.controls.startDate.valid&&this.repayForm.controls.endDate.valid){
				//获取折扣
				this.appApi.getSecurityDepositRate({
					plan_amount: this.rePayModel.amount,
					start_time: this.rePayModel.startDate,
					end_time: this.rePayModel.endDate
				}).subscribe(data => {
					if(data!=undefined){
						this.discountList = data.rate_list;
						this._getMinAmount();
					}
				});
			}
		},0);
	}
	/**
	 * 根据保证金和保证金比例计算出最小还款金额
	 */
	_getMinAmount(){
		if(this.rePayModel.amount==''||this.rePayModel.amount==null||this.rePayModel.amount== undefined){

		}else if(this.discount==null||this.discount== undefined){

		}else{
			this.rePayModel.minAmount = Math.ceil(this.rePayModel.amount * this.discount);
			this.getRemark();
		}

	}
	/**
	 * 获取最小还款金额
	 *
	 * @memberof RepaymentPage
	 */
	// getMinAmount(): void {
	// 	this.endMinDate = moment(this.rePayModel.startDate).format('YYYY-MM-DD');
	// 	this.endMaxDate = moment(this.rePayModel.startDate).add(56, 'd').format('YYYY-MM-DD');

	// 	if (this.rePayModel.amount != undefined && this.rePayModel.startDate != undefined && this.rePayModel.endDate != undefined) {
	// 		this.appApi.getMinSinglePayAmount(
	// 			{
	// 				plan_amount: this.rePayModel.amount,
	// 				start_time: this.rePayModel.startDate,
	// 				daily_pay_count: this.rePayModel.repayTimes,
	// 				end_time: this.rePayModel.endDate
	// 			}).subscribe(data => {
	// 				// this.rePayModel.minAmount = new Number(data.min_single_pay_amount);
	// 				//this.rePayModel.minAmount = data.min_single_pay_amount;
	// 				console.log("::" + data);
	// 				if (data) {
	// 					this.minFee = data.min_single_pay_amount;
	// 					if (this.minFee == this.rePayModel.minAmount) {
	// 					} else {
	// 						this.rePayModel.minAmount = data.min_single_pay_amount;
	// 						this.getRemark();//调用获取备注信息
	// 					}

	// 				}

	// 			});
	// 	}
	// }
	/**
	 * 获取备注信息
	 */
	getRemark(): void {

		let valid:boolean = this.rePayModel.minAmount && this.rePayModel.maxAmount &&(this.rePayModel.maxAmount -this.rePayModel.minAmount >=0);
		if (valid) {
			this.appApi.getSecurityDeposit(
				{
					max_single_pay_amount: this.rePayModel.maxAmount,
					min_single_pay_amount: this.rePayModel.minAmount,
					plan_amount: this.rePayModel.amount
				}).subscribe(data => {
					console.log(data);

					this.remark = data.remark;
					this.remarkHidden = false;
				});
		}

	}
	getRemarkBymaxAmount(): void {
		if(this.rePayModel.maxAmount - this.rePayModel.amount >=0 ){
			this.rePayModel.maxAmount = this.rePayModel.amount;
		}

		if ((this.rePayModel.maxAmount - this.rePayModel.minAmount) >= 0) {
			this.getRemark();
		}else{
			this.remarkHidden = true;
		}
	}
	/**
	 * 选择银行卡
	 *
	 * @memberof RepaymentPage
	 */
	select(): void {
		let callback = (card): any => {
			console.log(card);
			this.card = card;
			return Promise.resolve();
		};
		this.app.getRootNav().push(SelectCardPage, {
			type: '02',
			card: this.card ? this.card.card_no : undefined,
			callback: callback
		});
	}

	//传入tab序号显示对应tabs页
	switchTabs(num: number) {
		if (this.navCtrl.parent) {
			this.navCtrl.parent.select(num);
		}
	}
}
