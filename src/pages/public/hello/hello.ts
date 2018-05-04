import { Component } from '@angular/core';
import {App, NavController, NavParams,ViewController } from 'ionic-angular';

import { LoginPage } from '../../login/login';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-hello',
	templateUrl: 'hello.html',
})
export class HelloPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		private app:App,
		private viewCtrl:ViewController
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad HelloPage');
	}
	start(): void {
		this.storage.set('start', 'yes');
		this.app.getRootNav().push(LoginPage);
		this.navCtrl.removeView(this.viewCtrl);
	}
}
