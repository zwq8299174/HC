import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';//工具类

import { Storage } from '@ionic/storage';

import { AppApi } from '../../providers/app-api/app-api';
import { ShareProfitPage } from '../share-profit/share-profit';


@Component({
	selector: 'page-index',
	templateUrl: 'index.html'
})

export class IndexPage implements OnInit {

	constructor(
		public navCtrl: NavController,
		private appApi: AppApi,
		private tools: ToolsProvider,
		private storage: Storage,
		private app: App
	) { }
	ngOnInit(): void {

	}

	/**
	 * 切换到还款页面
	 *
	 * @memberof IndexPage
	 */
	pushRepaymentPage(): void {
		this.navCtrl.parent.select(1);
	}
	/**
	 * 切换到收款页面
	 *
	 * @memberof IndexPage
	 */
	pushPaymentPage(): void {
		this.navCtrl.parent.select(3);
	}

	/**
	 * 跳转到分润页面
	 *
	 * @memberof IndexPage
	 */
	pushShareProfitPage(): void {
		this.app.getRootNav().push(ShareProfitPage);
	}
}
