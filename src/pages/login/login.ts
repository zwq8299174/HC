import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, NavController, NavParams,ToastController, ViewController,ModalController } from 'ionic-angular';
import { ToolsProvider } from '../../providers/tools/tools';//工具类
import { NgForm } from '@angular/forms';

import { HomePage } from '../home/home';
import {UserAgreementPage}from'../user-center/user-agreement/user-agreement';

import { AppApi } from '../../providers/app-api/app-api';

import { Storage } from '@ionic/storage';

import { ToasterProvider } from '../../providers/toaster/toaster'

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})




export class LoginPage {
	@ViewChild('loginWrapper') loginWrapper: ElementRef;
	@ViewChild('loginForm') loginForm: NgForm;


	mobile: string;
	code: number;
	codeTxt: string = '获取验证码';
	time: number = 59;
	sms_trade_id: string;



	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private tools: ToolsProvider,
		private storage: Storage,
		private toaster: ToasterProvider,
		private toastCtr: ToastController,
		private app: App,
		private viewCtrl: ViewController,
		private modal:ModalController
	) { }

	ionViewDidLoad() {
		// let toast = this.toaster.show({
		// 	message:'直接点击登录按钮进行测试'
		// });
		// alert(this.loginWrapper.nativeElement.clientWidth);
		// console.log(this.loginWrapper.nativeElement.clientWidth);
	}
	/**
	 * 登录
	 */
	login(): void {
		if (this.loginForm.valid) {
			this.appApi.login({
				login_name: this.mobile,
				sms_trade_id: this.sms_trade_id,
				sms_valid_code: this.code
			}).subscribe(data => {
				console.log(data);
				if(!data) return;
				this.tools.offlineSet('user', data.user_info);
				this.storage.set('user', data.user_info);
				this.toaster.show({
					message:'登录成功',
					duration: 1000,
					callback:()=>{
						this.navCtrl.push(HomePage);
						this.navCtrl.removeView(this.viewCtrl);
					}
				});
			});
		};
		// this.appApi.login({
		// 	login_name: 18647147161,
		// 	sms_trade_id: 123456789,
		// 	sms_valid_code: 1111
		// }).subscribe(data => {
		// 	console.log(888);
		// 	this.tools.offlineSet('user', data.user_info);
		// 	this.storage.set('user', data.user_info);
		// 	this.app.getRootNav().push(HomePage);
		// 	this.navCtrl.removeView(this.viewCtrl);
		// });
	}

	/**
	 * 获取验证码
	 */
	getCode(): void {
		if(this.loginForm.controls.mobile.valid&&this.time==59){
			this.appApi.getCode({
				login_name: this.mobile,
				type: 12
			}).subscribe(data => {
				if (data != undefined && data.sms_trade_id != null && data.sms_trade_id != undefined) {
					this.toaster.show({
						message:'发送成功',
						duration:1000
					});
					this.sms_trade_id = data.sms_trade_id;
					this.countDown();
				}
			});
		}
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
	agreement():void{
		let profileModal = this.modal.create(UserAgreementPage,{type:'login'});
   		profileModal.present();
	}
}
