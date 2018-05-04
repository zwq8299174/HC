import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, LoadingController, ToastController,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import * as moment from 'moment'

import { OpenMerchantPage } from '../../user-center/open-merchant/open-merchant';

import { UserModel } from '../../../providers/model/user-model';

import { AppApi } from '../../../providers/app-api/app-api';
import { ToasterProvider } from '../../../providers/toaster/toaster';

@Component({
	selector: 'page-add-card',
	templateUrl: 'add-card.html',
})
export class AddCardPage implements OnInit {
	@ViewChild('form') form: NgForm;
	header: string = this.navParams.get('type') == '01' ? '储蓄卡' : '信用卡';
	type: number = this.navParams.get('type');
	callback: any = this.navParams.get('callback');
	user: any;
	addModel: any = {};
	cardNum: string;
	amount: string;
	time: number = 59;
	monthDay: any[] = [];
	codeTxt: string = '获取验证码';
	load: boolean = false;
	cardInfo: any;
	minDate:any;
	maxDate:any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private appApi: AppApi,
		private storage: Storage,
		private toast: ToasterProvider,
		private alertCtrl:AlertController
	) { }
	ngOnInit(): void {
		this.makeDayList();
		this.minDate = moment().format('YYYY-MM');
		this.maxDate = moment().add(10,'years').format('YYYY-MM');
	}
	ionViewDidEnter(): void {
		console.log(this.type);
		this.getUserData();
	}
	presentConfirm() {
		let alert = this.alertCtrl.create({
			title: '您未开通商户，请先开通商户',
			message: '未开通商户无法添加银行卡',
			buttons: [
				{
					text: '取消',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
						this.navCtrl.pop();
					}
				},
				{
					text: '确定',
					handler: () => {
						this.navCtrl.push(OpenMerchantPage,{
							pageType:'0'
						})
					}
				}
			]
		});
		alert.present();
	}
	makeDayList(): void {
		for (let i = 1; i <= 31; i++) {
			this.monthDay.push({
				day: i + '号',
				val: i < 10 ? '0' + i : i
			});
		}
	}
	getUserData(): void {
		this.storage.get('user').then((data) => {
			if (data) {
				if (data.is_reg_mer == '0') {
					this.presentConfirm();
				}else{
					this.user = data;
					this.addModel.identify_no = data.identify_no;
					this.addModel.user_name = data.user_name;
					this.addModel.bank_phonenumber = data.login_name;
				}
			}
			console.log(data);
		});
	}
	typeChange(type): void {
		this.type = type;
	}
	getCardInfo(): any {
		if (this.form.controls.card.invalid) return;
		this.load = true;
		this.appApi.getBankInfoByCrdNo({
			card_no: this.addModel.card_no
		}).subscribe(data => {
			if(data){
				this.cardInfo = data.card_info;
				this.load = false;
				this.addModel.bank_name = data.card_info.bank_name;
				this.addModel.card_type = data.card_info.card_type;
			}
		});
	}
	add(): void {
		console.log(this.addModel);
		if (this.form.valid && this.load == false) {
			this.appApi.bindBankCard(this.addModel).subscribe(data => {
				console.log(data);
				if (!data) return;
				this.toast.show({
					message: '添加成功',
					duration:3000,
					callback: () => {
						if (this.callback) {
							this.navCtrl.pop();
						};
					}
				});
			});
		}
	}
	billDateChange(): void {
		if (this.addModel.statement_date) {
			this.form.controls.billDate.errors.required = false;
		} else {
			this.form.controls.billDate.errors.required = true;
		};
		console.log(this.addModel.statement_date);
	}
	getCode(): void {
		console.log(this.addModel.bank_phonenumber);
		console.log(this.addModel.card_no);
		console.log(this.addModel.expired_date);
		console.log(this.type);
		if (this.time < 59 || this.form.controls.card.invalid || this.form.controls.mobile.invalid) return;
		this.appApi.getCode({
			login_name: this.addModel.bank_phonenumber,
			card_no: this.addModel.card_no,
			expired_date: this.addModel.expired_date,
			cvv2: this.addModel.cvv2,
			card_type:this.type,
			type: 36
		}).subscribe(data => {
			console.log(data);
			if (!data) return;
			this.addModel.sms_trade_id = data.sms_trade_id;
			this.countDown();
		});
	}
	countDown() {
		const CD = setInterval(() => {
			if (this.time > 0) {
				this.codeTxt = this.time + 's后重发';
				this.time--;
			} else {
				this.codeTxt = '发送验证码';
				clearInterval(CD);
				this.time = 59;
			}
		}, 1000);
	}
	cardPaste(): void {
		setTimeout(() => {
			let flag = 4;
			let arr = [];
			for (let i = 0; i < Math.ceil(this.cardNum.length / 4); i++) {
				arr.push(this.cardNum.substr(i * flag, flag));
			};
			this.cardNum = arr.join(' ');
		}, 0);
	}
	cardInput(e): void {
		setTimeout(() => {
			if (e.keyCode !== 8 && (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105)) {
				if (this.cardNum) {
					this.cardNum = this.cardNum.slice(0, -1);
				};
				return;
			};
			if (e.keyCode === 8) {
				console.log(8);
				if (this.cardNum.slice(-1) === ' ') {
					this.cardNum = this.cardNum.slice(0, -1);
				}
			} else if (e.keyCode !== 8) {
				switch (this.cardNum.length) {
					case 4:
						this.cardNum += ' ';
						break;
					case 8 + 1:
						this.cardNum += ' ';
						break;
					case 12 + 2:
						this.cardNum += ' ';
						break;
					case 16 + 3:
						this.cardNum += ' ';
						break;
					case 20 + 4:
						this.cardNum += ' ';
						break;
				}
			};
		}, 0);
	}
}
