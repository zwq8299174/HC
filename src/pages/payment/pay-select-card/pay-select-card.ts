import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';

import { SelectCardPage } from '../../public/select-card/select-card';
import { AppApi } from '../../../providers/app-api/app-api';

import * as moment from 'moment';
import { ToasterProvider } from '../../../providers/toaster/toaster';
import { PaymentListPage } from '../payment-list/payment-list';
import { WebviewPage } from '../../public/webview/webview';
import {DealPasswordPage} from '../../public/deal-password/deal-password'


@Component({
	selector: 'page-pay-select-card',
	templateUrl: 'pay-select-card.html',
})
export class PaySelectCardPage {

	depositCard: any;//储蓄卡
	creditCard: any;//信用卡

	paymentModel: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private toast: ToasterProvider,
		private modal:ModalController
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad PaySelectCardPage');
		console.log(this.navParams.data);
		this.paymentModel = this.navParams.data;
	}

	//选择储蓄卡
	selectDepositCard(): void {
		console.log('选择储蓄卡');
		let callback = (card): any => {
			console.log(card);
			this.depositCard = card;
			return Promise.resolve();
		};
		this.navCtrl.push(SelectCardPage, {
			type: '01',
			card: this.depositCard ? this.depositCard.card_no : undefined,
			callback: callback
		});

	}

	//选择信用卡
	selectCreditCard(): void {
		let callback = (card): any => {
			console.log(card);
			this.creditCard = card;
			return Promise.resolve();
		};
		this.navCtrl.push(SelectCardPage, {
			type: '02',
			card: this.creditCard ? this.creditCard.card_no : undefined,
			callback: callback
		});
	}
	affirmPwd():void{
		let profileModal = this.modal.create(DealPasswordPage,{},{
			showBackdrop:false
		});
   		profileModal.present();
		profileModal.onDidDismiss((d)=>{
			console.log(d);
			if(d){
				this.postPwd(d);
			}
		});
	}
	postPwd(pwd:any):void{
		console.log(123);
	}
	/**
 		* 	amount:收款金额,
			paypassword:支付密码,
			receive_crdno:结算卡号,
			mac:验证签名,
			consumer_crdno:支付卡号,
			pass_type:密码类型,
			chnl_id:通道ID,
			order_id:第三方订单号
		 *
		 * @memberof PaySelectCardPage
		 */
	payment(): void {
		let randomNumber = new Date().getTime().toString() + '11';
		let params = {
			amount: this.paymentModel.amount,
			paypassword: '123456',
			receive_crdno: this.creditCard.card_no,
			mac: '123456',
			consumer_crdno: this.depositCard.card_no,
			pass_type: '1',
			chnl_id: this.paymentModel.chnl_id,
			order_id: randomNumber
		}
		console.log(params);
		this.appApi.getColl(params).subscribe(data => {
			console.log(data);
			this.toast.show({
				message: '收款成功',
				callback: () => {
					this.navCtrl.push(PaymentListPage);
					// this.navCtrl.push(WebviewPage, {
					// 	args:data
					// });
				}
			})
		});

	}

}
