import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { AddCardPage } from '../add-card/add-card';
import { AppApi } from '../../../providers/app-api/app-api';





//银行卡选择公共组件用法
// let callback = (card):any=>{
// 	console.log(card);//得到银行卡信息
// 	this.card = card;
// 	return Promise.resolve();
// };
//this.navCtrl.push(SelectCardPage, {
// 	type: '02',非必传。银行卡类型：01储蓄卡、02信用卡
// 	card: '6259960102512225',非必传。//如果已经选则过银行卡，设置已经选择的银行卡号，用于修改银行卡
// 	callback:callback//选择银行卡以后的回调函数
// });



@Component({
	selector: 'page-select-card',
	templateUrl: 'select-card.html',
})
export class SelectCardPage implements OnInit {
	header: String = !this.navParams.get('type') ? '银行卡' : this.navParams.get('type') == '01' ? '储蓄卡' : '信用卡';
	buttonName:string = !this.navParams.get('type')?'添加银行卡':this.navParams.get('type') == '01'?'添加储蓄卡':'添加信用卡';
	cardList: any[] = [];
	activeCard: String = this.navParams.get('card');
	type: Number = this.navParams.get('type');
	callback: any = this.navParams.get('callback');
	loading: any;
	load: boolean = true;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		private appApi: AppApi
	) {}
	ngOnInit(): void {
		this.loading = this.loadingCtrl.create({});
		this.loading.present();
	}
	ionViewDidEnter() {
		console.log(this.type);
		this.getBindCardList();
	}
	getBindCardList(): void {
		this.appApi.getBindCardList({
			card_type: this.type
		}).subscribe(data => {
			console.log(data);
			this.load = false;
			this.cardList = data.card_list;
			setTimeout(() => {
				this.loading.dismiss();
			}, 0);
		});
	}
	cardTap(card: any): void {
		this.activeCard = card.card_no;
		this.callback(card).then(() => {
			this.navCtrl.pop();
		});
	}
	add(): void {
		let callback = (data): any => {
			console.log(data);
			return Promise.resolve();
		};
		this.navCtrl.push(AddCardPage, {
			type: this.type,
			callback: callback
		});
	}
}
