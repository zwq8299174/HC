import { Component, OnInit,ViewChild } from '@angular/core';
import { App, NavController, NavParams, Navbar, LoadingController } from 'ionic-angular';
import { RepaymentInfoPage } from '../repayment-info/repayment-info';
import { AppApi } from '../../../providers/app-api/app-api';
import { RepaymentPage } from '../repayment';
import { TabsChangeService } from '../../../providers/service/tabs-change.service';

@Component({
	selector: 'page-repay-list',
	templateUrl: 'repay-list.html'
})
export class RepayListPage implements OnInit {
	@ViewChild(Navbar) navBar:Navbar;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private app: App,
		private tabsChangeService:TabsChangeService,
		private loadingCtrl:LoadingController
	) { 
		//订阅tabsChangeService
		this.tabsChangeService.tabsChangeEvent.subscribe(event=>{
			this.switchTabs(event)
			
		});
	}
	loading:any;
	repayList: any[];
	ngOnInit(): void {
	}
	toTargetViem(item: any): void {
		console.log(item.id);
		this.navCtrl.push(RepaymentInfoPage, {
			plan_id: item.id
		})
	}
	ionViewDidLoad() {
		console.log('RepayListPage ionViewDidLoad');
		this.navBar.backButtonClick= (e:UIEvent)=>{
			this.navCtrl.popToRoot();
			this.tabsChangeService.change(4);
		}
		
	}
	ionViewWillEnter(): void {

	}
	ionViewDidEnter(): void {
		this.getRepaymentList();

	}

	getRepaymentList(): void {
		this.loading = this.loadingCtrl.create({});
		this.loading.present();
		this.appApi.getRepaymentList().subscribe(data => {
			this.loading.dismiss();
			if (!data) return;
			this.repayList = data.plan_list;
			console.log(data.plan_list);

		});
	}
	add(): void {
		if (this.navCtrl.parent) {
			this.app.getRootNav().push(RepaymentPage);
		}else{
			this.navCtrl.push(RepaymentPage);
		}
	}

	//传入tab序号显示对应tabs页
	switchTabs(num:number) {
		if (this.navCtrl.parent) {
		this.navCtrl.parent.select(num);
		}
	}
}
