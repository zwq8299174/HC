import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppApi } from '../../../providers/app-api/app-api';
import { AddCardPage } from '../../public/add-card/add-card';



@Component({
	selector: 'page-cards',
	templateUrl: 'cards.html',
})
export class CardsPage {
	load: boolean = true;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
	) { }
	cardType = this.navParams.data.cardType;
	cardList: any;
	buttonName:string = this.cardType =='01'?'添加储蓄卡':'添加信用卡'

	ionViewDidLoad() {
		console.log('ionViewDidLoad CardsPage');
	}
	ionViewDidEnter() {
		console.log('cards ionViewDidEnter');
		this.getBindCardList();
	}

	getBindCardList(): void {
		this.appApi.getBindCardList({
			card_type: this.cardType
		}).subscribe(data => {
			console.log(data);
			this.cardList = data.card_list;
			this.load = false;
		});
	}
	add(): void {
		let callback = (data): any => {
			console.log(data);

			return Promise.resolve();
		};
		this.navCtrl.push(AddCardPage, {
			type: this.cardType,
			callback: callback
		});
	}
}
