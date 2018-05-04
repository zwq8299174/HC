import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';

import { SharePanelPage } from './share-panel/share-panel';
import {ToasterProvider}from '../../providers/toaster/toaster';
import { WechatProvider } from '../../providers/wechat/wechat';
import { PhotoLibrary } from '@ionic-native/photo-library';
import {UserModel}from'../../providers/model/user-model';

import {BaseSet}from '../../providers/base-set/base-set';


import { Storage } from '@ionic/storage';
@Component({
	selector: 'page-share',
	templateUrl: 'share.html',
})
export class SharePage {
	user:UserModel;
	imgUrl:string;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private actionSheetCtrl: ActionSheetController,
		private photoLibrary: PhotoLibrary,
		private wechat: WechatProvider,
		private modalCtrl: ModalController,
		private baseSet:BaseSet,
		private storage: Storage,
		private toaster:ToasterProvider
	) { }

	ionViewDidLoad() {
		this.getUserData();
	}
	getUserData(): void {
		this.storage.get('user').then((data) => {
			this.user = data;
			this.imgUrl = this.baseSet.baseUrl + this.user.share_img;
		});
	}
	hold(): void {
		this.presentActionSheet();
	}
	presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			buttons: [
				{
					text: '保存到相册',
					handler: () => {
						console.log('Archive clicked');
						this.saveImg();
					}
				},
				{
					text: '分享到朋友圈',
					handler: () => {
						console.log('wechatTimeLine');
						this.wechatTimeLine();
					}
				},
				{
					text: '分享给朋友',
					handler: () => {
						console.log('wechatFriend');
						this.wechatFriend();
					}
				},
				{
					text: '取消',
					role: 'cancel',
					handler: () => {

					}
				}
			]
		});
		actionSheet.present();
	}
	saveImg(): void {
		this.photoLibrary.requestAuthorization().then(() => {
			this.photoLibrary.saveImage(this.imgUrl, this.imgUrl).then(()=>{
				this.toaster.show({
					message:'保存成功',
					duration:2000
				});
			});
		})
	}
	share(): void {
		console.log(window.Wechat);
		this.presentModal();
	}
	presentModal() {
		let profileModal = this.modalCtrl.create(SharePanelPage);
		profileModal.present();
	}
	wechatFriend(): void {
		if(typeof window.Wechat === 'undefined') return;
		this.wechat.share({
			thumb:this.imgUrl,
			media:{
				type: window.Wechat.Type.IMAGE,
				image:this.imgUrl
			}
		},0);
	}
	wechatTimeLine(): void {
		if(typeof window.Wechat === 'undefined') return;
		this.wechat.share({
			thumb:this.imgUrl,
			media:{
				type: window.Wechat.Type.IMAGE,
				image:this.imgUrl
			}
		},1);
	}
}
