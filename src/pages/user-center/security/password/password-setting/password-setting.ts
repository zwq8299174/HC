import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToasterProvider } from '../../../../../providers/toaster/toaster';
import { AppApi } from '../../../../../providers/app-api/app-api';

import { NgForm } from '@angular/forms';
import {PasswordPage} from '../password'

@Component({
	selector: 'page-password-setting',
	templateUrl: 'password-setting.html',
})
export class PasswordSettingPage {
	@ViewChild('form') form: NgForm;

	passwordModel:any = {
		oldPwd : '',
		newPwd : '',
		againPwd : ''
	}

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private toast: ToasterProvider,
		private appApi: AppApi
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PasswordSettingPage');
	}

	/**
	 * 调用接口修改交易密码
	 */
	modifyPassword(): void {
		if(this.passwordModel.newPwd!=this.passwordModel.againPwd){
			console.log("俩次密码不一样");
		}else if(this.form.valid){
			this.appApi.updatePayPwd({
				old_pwd : this.passwordModel.oldPwd,
				new_pwd: this.passwordModel.newPwd,
				pass_type: 'paypwd'
			}).subscribe(data => {
				this.toast.show({
					message: '修改交易密码成功',
					callback: () => {
						this.navCtrl.push(PasswordPage);
					}
				})
			});
		}
	}

}
