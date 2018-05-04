import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, App } from 'ionic-angular';

import { AppApi } from '../../providers/app-api/app-api';
import { PaySelectCardPage } from './pay-select-card/pay-select-card';
import { TabsChangeService } from '../../providers/service/tabs-change.service';


@Component({
	selector: 'page-payment',
	templateUrl: 'payment.html',
})
export class PaymentPage {
	paymentModel: any = {};
	amount: any;//金额
	userChnl: any[] = [];//渠道列表
	isDisabled: boolean = true;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		public actionSheetCtrl: ActionSheetController,
		public app: App,
		private tabsChangeService:TabsChangeService,
	) {
		//订阅tabsChangeService
		this.tabsChangeService.tabsChangeEvent.subscribe(event=>{
			this.switchTabs(event);
		});
	 }

	ionViewDidLoad() {


	}
	ionViewDidEnter(){
		console.log('PaymentPage ionViewDidEnter ');
	}

	payment(): void {
		// this.showChannel();
		this.getUserChnlQuery();
	}
	showChannel(): void {
		let channelSheet = this.actionSheetCtrl.create({
			cssClass: 'channel-container',
			title: '名称-----------------------费率-----------------------单笔限额',
			buttons: this.userChnl
		});
		channelSheet.present();
	}

	/**
	 * 获取渠道列表并展示
	 *
	 * @memberof PaymentPage
	 */
	getUserChnlQuery(): void {

		this.appApi.userChnlQuery({}).subscribe(data => {

			if (data != undefined && data.user_chnl_list != null) {
				console.log(data.user_chnl_list);
				this.userChnl = [];
				for (let item of data.user_chnl_list) {
					let elemnt = {
						text: item.merch_abb + '--------------' + '0'+item.chnl_rate + '%' + '--------------' + item.single_up_amount,
						handler: () => {
							console.log('Destructive clicked');
							console.log(item);
							this.paymentModel.amount = this.amount;
							this.paymentModel.chnl_id = item.chnl_id;
							this.pushPage(this.paymentModel);

						}
					};
					this.userChnl.push(elemnt);
				}

				this.userChnl.push({
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				});
				this.showChannel();
			}
		});
  }

	pushPage(model: any): void {
		if (this.navCtrl.parent) {
			this.app.getRootNav().push(PaySelectCardPage, model);
		}else{
			this.navCtrl.push(PaySelectCardPage,model);
		}

		this.clearingData();
	}

	//清除数据
	clearingData():void{
		this.amount = '';
	}

	//传入tab序号显示对应tabs页
	switchTabs(num:number) {
		if (this.navCtrl.parent) {
		this.navCtrl.parent.select(num);
		}
	}
}
