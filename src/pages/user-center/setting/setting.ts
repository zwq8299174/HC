import { Component } from '@angular/core';
import {App, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { AppApi } from '../../../providers/app-api/app-api';

import { TextPage } from '../text-page/text-page';
import { UserInfoPage } from '../user-info/user-info';
import { SecurityPage } from '../security/security';
import { FeedBackPage } from '../feed-back/feed-back';
import { UserAgreementPage } from '../user-agreement/user-agreement';
import { AboutUsPage } from '../about-us/about-us';
import { LoginPage } from '../../login/login';
import { ToolsProvider } from '../../../providers/tools/tools';

import { UserModel } from '../../../providers/model/user-model';
@Component({
	selector: 'page-setting',
	templateUrl: 'setting.html',
})
export class SettingPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		private app:App,
		private appApi: AppApi,
		private tools:ToolsProvider
	) { }
	user: UserModel;

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingPage');
	}

	ionViewWillEnter(): void {
		console.log("usercenter WillEnter");
		this.storage.get('user').then(data => {
			this.user = data;

		});
	}

	goUserInfo(): void {
		this.navCtrl.push(UserInfoPage);
	}
	textPage(): void {
		this.navCtrl.push(TextPage);
	}
	goSecurity(): void {
		this.navCtrl.push(SecurityPage);
	}
	goFeedBack(): void {
		this.navCtrl.push(FeedBackPage);
	}
	goUserAgreement(): void {
		this.navCtrl.push(UserAgreementPage);
	}
	goAboutUs(): void {
		this.navCtrl.push(AboutUsPage);
	}
	goLogout(): void {
		this.appApi.logout({
			login_name:this.user.login_name
		}).subscribe(data => {
			this.storage.remove('user');
			this.tools.offlineRemove('user');
			this.app.getRootNav().push(LoginPage);
		});
	}
}
