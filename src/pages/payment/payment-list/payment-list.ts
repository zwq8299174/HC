import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, LoadingController} from 'ionic-angular';
import { AppApi } from '../../../providers/app-api/app-api';
import { TabsChangeService } from '../../../providers/service/tabs-change.service';


@Component({
	selector: 'page-payment-list',
	templateUrl: 'payment-list.html',
})
export class PaymentListPage {
	@ViewChild(Navbar) navBar: Navbar;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi:AppApi,
		private tabsChangeService:TabsChangeService,
		private loadingCtrl:LoadingController
	) {	}

	loading:any;
	paymentList:any[] = [
		{
			bank_ename:'cmb',
			bank_name:'招商银行',
			card_no:'6523657854214521',
			cardType:'02',
			amount:8953256
		}
	];

	ionViewDidLoad() {
		this.navBar.backButtonClick = (e:UIEvent)=>{
			this.navCtrl.popToRoot();
			this.tabsChangeService.change(4);
		}
	}
	ionViewDidEnter() {
		console.log('ionViewDidEnter PaymentListPage');
		// this.getAcctDetailQuery();
	}

	getAcctDetailQuery():void{
		this.loading = this.loadingCtrl.create({});
		this.loading.present();
		this.appApi.acctDetailQuery({
			attr_code:'recharge'
		}).subscribe(data=>{
			this.loading.dismiss();
			if (data) {
				console.log(data);
				this.paymentList = data.detail_list;
			}
		});
	}
	  

}
