import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import{PasswordPage}from './password/password';

@Component({
	selector: 'page-security',
	templateUrl: 'security.html',
})
export class SecurityPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SecurityPage');
	}
	/**
	 * 去修改交易密码页面
	 */
	goPasswordSetting():void{
		this.navCtrl.push(PasswordPage);
	}
}
