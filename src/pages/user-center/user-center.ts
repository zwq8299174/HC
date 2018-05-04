import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../providers/model/user-model';
import { AppApi } from '../../providers/app-api/app-api';

import { BalancePage } from './balance/balance';
import { CardsPage } from './cards/cards';
import { PaymentListPage } from '../payment/payment-list/payment-list';
import { RepayListPage } from '../repayment/repay-list/repay-list';
import { TextPage } from './text-page/text-page';
import { UserInfoPage } from './user-info/user-info';
import { OperationManualPage } from './operation-manual/operation-manual';
import { CommonProblemPage } from './common-problem/common-problem';
import { ChannelRatePage } from './channel-rate/channel-rate';
import { SettingPage } from './setting/setting';
import { OverviewPage } from './overview/overview';
import { ActivateMemberPage } from './activate-member/activate-member';


@Component({
	selector: 'page-user-center',
	templateUrl: 'user-center.html',
})
export class UserCenterPage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		private appApi: AppApi,
		private app: App
	) { }
	user: UserModel;
	acctIncome: any = {};//账户收益
	showAcctIncome: boolean; //显示账户收益数据
	icon: string;
	ionViewDidLoad() {
		console.log('ionViewDidLoad UserCenterPage');
		console.log(this.navCtrl.parent);
	}
	ionViewWillEnter(): void {
		console.log('usercenter WillEnter');
		this.getStorage();
	}
	ionViewDidEnter(): void {
		console.log('usercenter DidEnter');

		this.acctIncomeQuery();

	}
	acctIncomeQuery(): void {
		this.appApi.acctIncomeQuery().subscribe(data => {
			// console.log(data);
			if (data) {
				this.acctIncome.total_income = data.total_income;
				this.acctIncome.month_income = data.month_income;
				this.acctIncome.day_income = data.day_income;
			} else {
				this.acctIncome.total_income = '-';
				this.acctIncome.month_income = '-';
				this.acctIncome.day_income = '-';
			}
		});
	}
	getStorage(): void {
		this.storage.get('user').then(data => {
			this.user = data;

		});
		this.storage.get('showAcctIncome').then(data => {
			console.log('showAcctIncome');
			console.log(data);
			if (data != null) {
				this.showAcctIncome = data;
				if (this.showAcctIncome) {
					this.icon = '&#xe622;';
				} else {
					this.icon = '&#xe61d;';
				}
			} else {
				this.showAcctIncome = true;
				this.icon = '&#xe622;';
			}
		});
	}

	showMoney(e): void {
		e.stopPropagation();
		e.preventDefault();
		this.showAcctIncome = !this.showAcctIncome;
		this.storage.set('showAcctIncome', this.showAcctIncome);
		if (this.showAcctIncome) {
			this.icon = '&#xe622;';
		} else {
			this.icon = '&#xe61d;';
		}
	}
	goBalance(): void {
		this.app.getRootNav().push(BalancePage);
	}
	goCards(cardType: string): void {
		this.app.getRootNav().push(CardsPage, {
			cardType: cardType
		});
	}
	goPaymentList(): void {
		this.app.getRootNav().push(PaymentListPage);
	}
	goRePaymentList(): void {
		this.app.getRootNav().push(RepayListPage);
	}
	goUserInfo(): void {
		this.app.getRootNav().push(UserInfoPage);
	}
	goOperationManual(): void {
		this.app.getRootNav().push(OperationManualPage);
	}
	goCommonProblem(): void {
		this.app.getRootNav().push(CommonProblemPage);
	}
	textPage(): void {
		this.app.getRootNav().push(TextPage);
	}
	goChannelRate(): void {
		this.app.getRootNav().push(ChannelRatePage);
	}
	setting(): void {
		this.app.getRootNav().push(SettingPage);
	}
	goOverview(e): void {
		e.stopPropagation();
		e.preventDefault();
		this.app.getRootNav().push(OverviewPage);
	}
	goActive():void{
		this.app.getRootNav().push(ActivateMemberPage,{
			pageType:'0'
		});

	}
}
