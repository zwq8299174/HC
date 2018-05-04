import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToasterProvider } from '../../../../../providers/toaster/toaster';
import { AppApi } from '../../../../../providers/app-api/app-api';

import { NgForm } from '@angular/forms';
import { PasswordPage } from '../password'
import {Storage}from'@ionic/storage';
import { ToolsProvider } from '../../../../../providers/tools/tools';//工具类



@Component({
	selector: 'page-password-forget',
	templateUrl: 'password-forget.html',
})
export class PasswordForgetPage {
	@ViewChild('form') form: NgForm;
	type:any = this.navParams.get('type');
	codeTxt: string = '获取验证码';
	time: number = 59;
	mobile: string;
	code: string;
	newPwd: string;
	againPwd: string;
	sms_trade_id: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private toast: ToasterProvider,
		private appApi: AppApi,
		private storage:Storage,
		private tools: ToolsProvider
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PasswordForgetPage');
		this.storage.get('user').then(data => {
			this.mobile = data.login_name;
			console.log(data);
		});
	}


	/**
	 * 获取验证码
	 */
	getCode(): void {
		if (this.form.controls.mobile.invalid||this.time < 59) return ;
		this.appApi.getCode({
			login_name: this.mobile,
			type: 16
		}).subscribe(data => {
			if (data) {
				this.toast.show({
					message:'验证码下发成功',
					duration: 1000
				});
				this.sms_trade_id = data.sms_trade_id;
				this.countDown();
			}
		});
	}

	/**
	 * 验证码倒计时
	 */
	countDown() {
		const CD = setInterval(() => {
			if (this.time > 0) {
				this.codeTxt = this.time + 's后重发';
				this.time--;
			} else {
				this.codeTxt = '发送验证码';
				clearInterval(CD);
				this.time = 59;
			}
		}, 1000);
	}

	/**
	 * 忘记交易密码
	 */
	forgetPwd(): void {
		if (this.newPwd != this.againPwd) {
			this.toast.show({
				message: '2次密码输入不一致,请重新输入',
				cssClass:'error',
				duration: 1000
			})
		} else if (this.form.valid) {
			console.log(this.newPwd);
			console.log(this.sms_trade_id);
			console.log(this.code);
			this.appApi.setPayPwd({
				paypassword: this.newPwd,
				sms_trade_id: this.sms_trade_id,
				sms_valid_code: this.code,
				pass_type: 'paypwd'
			}).subscribe(data => {
				console.log(data);
				if(data){
					this.tools.offlineSet('user', data.user_info);
					this.storage.set('user', data.user_info);
					this.toast.show({
						message: '设置成功',
						duration: 2000,
						callback: () => {
							this.navCtrl.pop();
						}
					})
				}
			});
		}
	}
}
