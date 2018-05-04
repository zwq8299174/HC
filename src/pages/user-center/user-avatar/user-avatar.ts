import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
	selector: 'page-user-avatar',
	templateUrl: 'user-avatar.html',
})
export class UserAvatarPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserAvatarPage');
	}

}
