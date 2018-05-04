import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { AppApi } from '../../../providers/app-api/app-api';
import { ToasterProvider } from '../../../providers/toaster/toaster';
import { RepayListPage } from '../../repayment/repay-list/repay-list';
import { UserModel } from '../../../providers/model/user-model';
import { ActivateMemberPage } from '../activate-member/activate-member';

@Component({
	selector: 'page-open-merchant',
	templateUrl: 'open-merchant.html',
})

export class OpenMerchantPage {
	@ViewChild('form') form: NgForm;
	formModel: any = {
		merch_name: '',//			text	1	商户名称
		merch_abb: '',//			text	1	商户简称
		merch_address: '',//		text	1	商户地址
		tel_no: '',//				text	1	联系电话
		bank_account_no: '',//		text	1	银行卡卡号
		bank_account_name: '',//	text	1	银行卡姓名
		identify_no: '',//			text	1	身份证号码
		phone_no: '',//				text	1	银行预留手机号码
		bank_code: '',//			text	1	银行编码
		settbank_name: '',//		text	1	银行名称
		bankp_province: '',//		text	1	开户省份
		bank_city: '',//			text	1	开户地市
		bank_sub_name: '',//		text	1	开户行支行
		bank_channel_no: '',//		text	1	开户行支行联行号
	};
	load: boolean = false;
	cardNum: string = '';
	cardInfo: any = {};
	provinceList: any;
	cityList: any;
	bankBranchList: any;
	parentPageType: any;//上一级页面 '0'=添加银行卡
	bankBranch: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private toast: ToasterProvider,
		private storage: Storage,
		private user: UserModel,
		private loadingCtrl:LoadingController
	) { }
	ionViewDidLoad() {
		console.log('ionViewDidLoad OpenMerchantPage');
		console.log(this.navParams);

		this.parentPageType = this.navParams.data.pageType;
	}
	ionViewDidEnter(): void {
		this.getProvinceList();
	}
	getProvinceList(): void {
		this.appApi.getProvinceList().subscribe((data) => {
			console.log(data);
			this.provinceList = data.province_list.reverse();
		});
	}
	provinceChange(): void {
		console.log(this.formModel.bankp_province);
		this.appApi.getCityList({
			area_code: this.formModel.bankp_province
		}).subscribe((data) => {
			console.log(data);
			this.cityList = data.city_list;
		});
	}
	cityChange(): void {
		console.log('this.formModel.bank_city==');
		console.log(this.formModel.bank_city);
		setTimeout(() => {
			this.getBankBranchList();
		}, 0);
	}
	bankBranchChange(): void {
		if (this.bankBranch) {
			this.formModel.bank_channel_no = this.bankBranch.bank_id;
			this.formModel.bank_sub_name = this.bankBranch.bank_name;
		}
	}
	getCardInfo(): any {//银行卡号改变后,获取银行卡信息
		if (this.form.controls.card.invalid) return;
		this.load = true;
		this.appApi.getBankInfoByCrdNo({
			card_no: this.formModel.bank_account_no
		}).subscribe(data => {
			if(data){
				this.cardInfo = data.card_info;
				this.load = false;
				this.formModel.settbank_name = data.card_info.bank_name;
				this.formModel.bank_code = data.card_info.bank_code;
				this.formModel.card_type = data.card_info.card_type;
			}
		});
	}
	//获取支行列表
	getBankBranchList(): void {
		if (this.form.controls.card.invalid || this.form.controls.city.invalid) return;
		console.log(this.formModel.bank_city);
		let loading = this.loadingCtrl.create();
		loading.present();
		this.appApi.getBankBranchList({
			card_no: this.formModel.bank_account_no,
			city_code: this.formModel.bank_city,
		}).subscribe(data => {
			console.log('getBankBranchList');
			console.log(data);
			if (data) {
				this.bankBranchList = data.branch_list;
			};
			loading.dismiss();
		});
	}
	/**
	 * 提交
	 *
	 * @memberof OpenMerchantPage
	 */
	open(): void {
		console.log(this.formModel);
		if (this.form.valid) {
			this.appApi.userMerInfo(this.formModel).subscribe(data => {
				console.log(data);
				if (data) {
					this.storage.set('user', data.user_info);
					this.user = data.user_info;
					this.toast.show({
						message: '注册商户成功',
						duration: 3000,
						callback: () => {
							this.pushPage();
						}
					});
				}
			});
		}
	}


	pushPage(): void {
		console.log(this.user);

		if (this.parentPageType == '0') {
			this.navCtrl.pop();
		} else {
			if (this.user.is_active == '0') {
				this.navCtrl.push(ActivateMemberPage);
			} else {
				this.storage.get('repaymentPlan').then((repaymentData) => {
					this.appApi.createRepaymentPlan(repaymentData).subscribe(data => {
						this.toast.show({
							message: '创建计划成功',
							callback: () => {
								this.navCtrl.push(RepayListPage);
							}
						})
					});
				});
			}
		}
	}
}
