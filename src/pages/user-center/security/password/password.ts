import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PasswordSettingPage } from './password-setting/password-setting';
import { PasswordForgetPage } from './password-forget/password-forget';

@Component({
	selector: 'page-password',
	templateUrl: 'password.html',
})
export class PasswordPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PasswordPage');
	}
	modify(): void {
		this.navCtrl.push(PasswordSettingPage);
	}
	forget(): void {
		this.navCtrl.push(PasswordForgetPage);
	}
}
