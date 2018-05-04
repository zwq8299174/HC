import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { UserModel } from '../../../providers/model/user-model';

@Component({
	selector: 'page-user-info',
	templateUrl: 'user-info.html',
})
export class UserInfoPage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage:Storage,
	) { }
	user: UserModel;

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserInfoPage');
	}
	ionViewWillEnter(): void {
		console.log("usercenter WillEnter");
		this.storage.get('user').then(data => {
			this.user = data;
			
		});
	}
}
