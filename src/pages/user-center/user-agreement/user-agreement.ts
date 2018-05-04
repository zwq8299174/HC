import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';



@Component({
	selector: 'page-user-agreement',
	templateUrl: 'user-agreement.html',
})
export class UserAgreementPage {
	type:string  = this.navParams.data.type;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private viewCtrl:ViewController
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserAgreementPage');
	}
	close():void{
		this.viewCtrl.dismiss();
	}
}
