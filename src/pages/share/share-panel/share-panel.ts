import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

import { WechatProvider } from '../../../providers/wechat/wechat';
import { BaseSet } from '../../../providers/base-set/base-set';
import {ToasterProvider}from '../../../providers/toaster/toaster';

import { UserModel } from '../../../providers/model/user-model';
import { Storage } from '@ionic/storage';



@Component({
	selector: 'page-share-panel',
	templateUrl: 'share-panel.html',
})
export class SharePanelPage {
	load: boolean = false;
	panelLoad: boolean = false;
	imgUrl: string = 'www/assets/imgs/logo.jpg';
	user: UserModel;


	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private wechat: WechatProvider,
		private viewCtrl: ViewController,
		private baseSet: BaseSet,
		private clipboard:Clipboard,
		private toaster:ToasterProvider,
		private storage: Storage
	) { 
		this.storage.get('user').then(data => {
			this.user = data;
		});
	}
	ionViewWillEnter() {
		this.panelLoad = true;
	}
	ionViewDidEnter() {
		this.load = true;
		console.log('ionViewDidLoad SharePanelPage');
	}
	dismiss() {
		this.panelLoad = false;
		this.load = false;
		setTimeout(() => {
			this.viewCtrl.dismiss({});
		}, 200);
	}
	wechatFriend(): void {
		if(typeof window.Wechat === 'undefined') return;
		this.wechat.share({
			title: '邀请您注册使用卡任还软件',
			description: '专业、智能、安全的信用卡代还APP,邀请好友注册使用有惊喜!',
			thumb: this.imgUrl,
			media: {
				type: window.Wechat.Type.LINK,
				webpageUrl: this.baseSet.baseUrl + '/registe/index.html?open='+this.user.open
			}
		}, 0);
	}
	wechatTimeLine(): void {
		if(typeof window.Wechat === 'undefined') return;
		this.wechat.share({
			title: '邀请您注册使用卡任还软件',
			description: '专业、智能、安全的信用卡代还APP,邀请好友注册使用有惊喜!',
			thumb: this.imgUrl,
			media: {
				type: window.Wechat.Type.LINK,
				webpageUrl: this.baseSet.baseUrl + '/registe/index.html?open='+this.user.open
			}
		}, 1);
	}
	copy():void{
		this.clipboard.copy(this.baseSet.baseUrl + '/registe/index.html?open='+this.user.open);
		this.toaster.show({
			message:'复制成功',
			duration:3000
		});
		this.dismiss();
	}
}
