import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppApi } from '../../../providers/app-api/app-api';


@Component({
	selector: 'page-channel-rate',
	templateUrl: 'channel-rate.html',
})
export class ChannelRatePage {

	userChnl: any[] = [];//渠道列表

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi
	) {
		
	}

	ionViewDidEnter(){
		this.appApi.userChnlQuery({}).subscribe(data => {

			if (data != undefined && data.user_chnl_list != null) {
				this.userChnl = data.user_chnl_list;
			}
		});
	}

	ionViewDidLoad() {

	}


}
