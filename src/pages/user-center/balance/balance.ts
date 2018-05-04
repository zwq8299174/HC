import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppApi } from '../../../providers/app-api/app-api';

import { BalanceDetailPage } from './balance-detail/balance-detail';
import { BalanceHandlePage } from './balance-handle/balance-handle';
import { ShareProfitPage } from '../../share-profit/share-profit';
@Component({
	selector: 'page-balance',
	templateUrl: 'balance.html',
})
export class BalancePage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi
	) { }

	balance: any;

	ionViewDidLoad() {
		console.log('ionViewDidLoad BalancePage');
	}
	ionViewDidEnter() {
		console.log(this.navParams);
		this.getAcctQuery();
	}
	getAcctQuery(): void {
		this.appApi.acctQuery().subscribe(data => {
			console.log(data);
			this.balance = data;
		});
	}
	goDetaile(type: any): void {
		let profitType: string;
		switch (type) {
			case '1':
				profitType = 'profit';
				break;
			case '2':
				profitType = 'recharge';
				break;
			case '3':
				profitType = 'withdraw';
				break;
			default:
				break;
		}
		this.navCtrl.push(BalanceDetailPage, {
			pageType: type,
			profitType:profitType
		});
	}
	handle(t: any): void {
		this.navCtrl.push(BalanceHandlePage, {
			type: t
		});
	}
}
