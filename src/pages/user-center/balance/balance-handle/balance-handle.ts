import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { SelectCardPage } from '../../../public/select-card/select-card';

import { QrcodePage } from '../../../public/qrcode/qrcode';
import { DealPasswordPage } from '../../../public/deal-password/deal-password';
import { PasswordForgetPage } from '../../security/password/password-forget/password-forget';


import { AppApi } from '../../../../providers/app-api/app-api';
import { ToasterProvider } from '../../../../providers/toaster/toaster';
import { ToolsProvider } from '../../../../providers/tools/tools';//工具类

@Component({
	selector: 'page-balance-handle',
	templateUrl: 'balance-handle.html',
})
export class BalanceHandlePage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private modal: ModalController,
		private appApi: AppApi,
		private toast: ToasterProvider,
		private tools: ToolsProvider,
		private alertCtrl: AlertController
	) {
		this.changeWord();
	}
	amount: any;
	title: string;
	cardTypeName: string;
	card: any;
	showCard: boolean = false;//显示银行卡
	ionViewDidLoad() {
		console.log('ionViewDidLoad BalanceHandlePage');
	}
	changeWord(): void {
		if (this.navParams.get('type') == '1') {
			this.title = '提现';
			this.cardTypeName = '储蓄卡';
			this.showCard = true;
		} else {
			this.title = '充值';
			this.cardTypeName = '银行卡';
			this.showCard = false;
		}
	}

	select(): void {
		let type: string = undefined;
		if (this.navParams.get('type') == '1') {
			type = '01';
		}

		//银行卡选择公共组件用法
		let callback = (card): any => {
			console.log(card);//得到银行卡信息
			this.card = card;
			return Promise.resolve();
		};
		this.navCtrl.push(SelectCardPage, {
			type: type, //非必传。银行卡类型：01储蓄卡、02信用卡 不传获取全部
			card: this.card ? this.card.card_no : undefined, //非必传。如果已经选则过银行卡，设置已经选择的银行卡号，用于修改银行卡
			callback: callback//选择银行卡以后的回调函数
		});
	}
	showQrCode(): void {
		this.appApi.qRcodePayServer({
			amount: this.amount,
			charge_type: 'recharge'
		}).subscribe(data => {
			console.log(data);
			if (data != undefined && data.qr_code != null) {

				let profileModal = this.modal.create(QrcodePage, {
					qrCodeData: data.qr_code
				}, {
						showBackdrop: false
					});
				profileModal.present();
				profileModal.onDidDismiss((d) => {
					console.log(d);
				});
			}
		});
	}
	payment(): void {
		console.log(this.card);
		if (this.navParams.get('type') == '1') {
			this.checkPwd();
		} else {
			this.showQrCode();
		}
	}
	checkPwd():void{
		let user = this.tools.offlineGet('user');
		if (user && user.isset_paypwd == '1') {
			let modal = this.modal.create(DealPasswordPage);
			modal.present();
			modal.onDidDismiss((d) => {
				console.log(d);
				if (d) {
					this.postData(d);
				}
			});
		} else {
			this.alertMsg();
		}
	}
	alertMsg():void{
		let alert = this.alertCtrl.create({
			title: '您未设置交易密码',
			message: '提现需要交易密码，现在去设置?',
			buttons: [
				{
					text: '取消',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
				{
					text: '确定',
					handler: () => {
						this.navCtrl.push(PasswordForgetPage,{
							type:'1'
						});
					}
				}
			]
		});
		alert.present();
	}
	postData(d:any): void {
		this.appApi.withdraw({
			amount: this.amount,
			card_no: this.card.card_no,
			paypassword:d
		}).subscribe(data => {
			console.log(data);
			if(data){
				this.toast.show({
					message: '提现申请已提交',
					duration: 1000,
					callback: () => {
						this.navCtrl.pop();
					}
				});
			}
		})
	}
}
