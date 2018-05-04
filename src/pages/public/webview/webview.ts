import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';

import {AppApi}from'../../../providers/app-api/app-api';

@Component({
	selector: 'page-webview',
	templateUrl: 'webview.html',
})
export class WebviewPage {
	url:string;
	webUrl: SafeResourceUrl;
	args: any = this.navParams.data.args?this.navParams.data.args.bank_req_info:undefined;
	params:any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public sanitizer: DomSanitizer,
		private appApi:AppApi
	) {}
	ngOnInit(): void {
		this.url = this.args?this.args.req_url:'';
		// for (let item in this.args) {
		// 	if (item != 'req_url') {
		// 		this.url += item+'='+encodeURIComponent(this.args[item])+'&';
		// 	}
		// };
		//
		if(this.args){
			console.log(this.args);
			delete this.args.req_url;
		//
		// this.webUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url.slice(0,-1));
			this.appApi.payment(this.url,this.args).subscribe((data)=>{
				console.log(123)
			})
		}
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad WebviewPage');
	}

}
