import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';


@Component({
	selector: 'page-deal-password',
	templateUrl: 'deal-password.html',
})
export class DealPasswordPage implements OnInit {
	@ViewChild('form') form: NgForm;
	load: boolean = false;
	password: number;
	user:any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private viewCtrl: ViewController
	) { }
	ngOnInit(): void {

	}
	ionViewDidEnter() {
		this.load = true;
	}
	dismiss() {
		this.load = false;
		setTimeout(() => {
			this.viewCtrl.dismiss({
				password: this.password
			});
		}, 200);
	}
	done(): void {
		if (this.form.valid) {
			this.dismiss();
		}
	}
}
