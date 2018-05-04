import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavController, NavParams, Content, Header, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AppApi } from '../../providers/app-api/app-api';

@Component({
	selector: 'page-share-profit',
	templateUrl: 'share-profit.html',
})
export class ShareProfitPage {
	@ViewChild('detailList') detailList: ElementRef;
	@ViewChild(Content) content: Content;
	@ViewChild(Header) header: Header;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private renderer2: Renderer2,
		private viewCtrl: ViewController,
		private storage: Storage,
		private appApi: AppApi
	) { }
	classType: string = '1';
	currentPage = 0;
	allpagenum: any = '0';
	profitInfo: any = {};
	profitList: any[] =[];


	ngOnInit(): void {
		this.renderer2.setStyle(this.detailList.nativeElement, 'height', (this.content._elementRef.nativeElement.clientHeight - this.detailList.nativeElement.offsetTop - this.header._elementRef.nativeElement.clientHeight) + 'px');
	}
	ionViewDidLoad() {
		console.log(this.header);
		console.log(this.content._elementRef.nativeElement.clientHeight);
		console.log('ionViewDidLoad ShareProfitPage');
	}
	ionViewDidEnter() {
		this.getProfitInfoQuery();
	}

	reloadProperty() {
		this.currentPage = 0;
		this.allpagenum = '0';
		this.profitList= [];
	}

	typeClick(t:any): void {
		this.classType = t;
		this.reloadProperty();
		this.getProfitInfoQuery();
	}

	getProfitInfoQuery() {
		this.storage.get('user').then(user => {
			console.log(user);
			if (this.currentPage > this.allpagenum) return;
			let param:any = {
				query_user_id: user.user_id,
				page: this.currentPage
			}
			if (this.classType == '2') {
				param.user_type = '02';
			}else if (this.classType == '3') {
				param.user_type = '03';
			}
			console.log(param);
			
			this.appApi.profitInfoQuery(param).subscribe(data => {
				console.log(data);
				this.currentPage ++;
				this.profitInfo = data;
				this.profitList = this.profitList.concat(data.profit_list);
				this.allpagenum = data.allpagenum;

			});
		});
	}
}
