import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AppApi } from '../../../providers/app-api/app-api';
import { ToasterProvider } from '../../../providers/toaster/toaster';
import { SettingPage } from '../setting/setting';
/**
 * Generated class for the FeedBackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feed-back',
  templateUrl: 'feed-back.html',
})
export class FeedBackPage {
  @ViewChild('form') form: NgForm;
  formModel: any = {
		feedback_content: '',//			text	1	反馈内容
	};
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appApi: AppApi,
		private toast:ToasterProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedBackPage');
  }

  /**
	 * 提交
	 * 
	 * @memberof FeedBackPage
	 */
	open():void{
		console.log(this.formModel);
		console.log(this.form);
		if (this.form.valid) {
			this.appApi.feedbackSubmit(this.formModel).subscribe(data=>{
				console.log(data);
				if (data) {
					this.toast.show({
            message: '提交反馈信息成功',
            duration:3000,
            callback: () => {
              this.navCtrl.pop();
            }
          })
				}
			});
		}
	}
}
