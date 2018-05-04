import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AppApi } from '../../../providers/app-api/app-api';
import { ToasterProvider } from '../../../providers/toaster/toaster';



@Component({
	selector: 'page-qrcode',
	templateUrl: 'qrcode.html',
})
export class QrcodePage {
	load:boolean = false;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private viewCtrl:ViewController,
		private appApi:AppApi,
		private storage:Storage,
		private toast:ToasterProvider
	) { }

	qrCodeData:any = undefined;
	parentPageType:any = undefined; //上一级页面'0'充值页面  1'会员页面
	timer:any;
	ionViewDidLoad(){
		console.log(this.navParams);
		this.qrCodeData = this.navParams.data.qrCodeData;
		this.parentPageType = this.navParams.data.qrPageType;
	}
	ionViewDidEnter() {
		this.load = true;
		if (this.parentPageType == '1') {
			this.getUserInfo();
		}
	}

	getUserInfo():void{
		this.timer = setInterval(() => {
			this.appApi.getUserInfo().subscribe(user=>{
				console.log(user);
				if (user.user_info.is_active == '1') {
					this.closeInterval();
					this.storage.set('user',user.user_info);
					this.toast.show({
						message:'注册会员成功！',
						duration:3000
					});
					this.close();
				}
			});
		}, 1000);
	}
	closeInterval():void{
		clearInterval(this.timer);
	}
	close(data?:any):void{
		this.viewCtrl.dismiss(data);
		this.closeInterval();
	}
}
