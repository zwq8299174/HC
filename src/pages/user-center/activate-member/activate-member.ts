import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AppApi } from '../../../providers/app-api/app-api';
import { OpenMerchantPage } from '../open-merchant/open-merchant';
import { UserModel } from '../../../providers/model/user-model';
import { ToolsProvider } from '../../../providers/tools/tools';
import { RepayListPage } from '../../repayment/repay-list/repay-list';
import { ToasterProvider } from '../../../providers/toaster/toaster';
import { QrcodePage } from '../../public/qrcode/qrcode';

@Component({
	selector: 'page-activate-member',
	templateUrl: 'activate-member.html',
})
export class ActivateMemberPage {
	isKey: boolean = true;
	color: string = 'light';
	activeKey: undefined;
	profileModal: any;
	parentPageType: any; //上级页面'0' 我的  '1'创建还款计划
	memberPrice:string; //显示支付金额

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appApi: AppApi,
		private tool: ToolsProvider,
		private storage: Storage,
		private toast: ToasterProvider,
		private modal: ModalController
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad ActivateMemberPage');
		this.parentPageType = this.navParams.data.pageType;
	}
	/**
	 * 激活码和在线支付切换
	 * @param type 
	 */
	wayChange(type: string): void {
		if (type == '01') {
			this.isKey = true;
		} else {
			this.isKey = false;
			this.appApi.getMemberPrice().subscribe(activeData => {
				this.memberPrice = activeData.member_price;
				this.appApi.qRcodePayServer({
					amount: activeData.member_price,
					charge_type: 'buyMember'
				}).subscribe(data => {
					console.log(data);
					if (data != undefined && data.qr_code != null) {
						this.profileModal = this.modal.create(QrcodePage, {
							qrCodeData: data.qr_code,
							qrPageType: '1'
						}, {
								showBackdrop: false
							});
						this.profileModal.present();
						this.profileModal.onDidDismiss((d) => {
							console.log(d);
							this.judgeActiveType();
						});
					}
				});
			});
		}
	}

	//判断是否办理会员
	judgeActiveType(): void {
		this.storage.get('user').then(user => {
			if (user.is_active == '1') {
				if (this.parentPageType = '0') {
					this.navCtrl.pop();
				} else {
					this.pushPage();
				}
			}
		})
	}
	/**
	 * 邀请码验证
	 */
	active(): void {
		console.log(this.activeKey);
		this.appApi.invitationCodeVertify({ invite_code: this.activeKey }).subscribe(data => {
			console.log(data);
			if (data!=undefined  && data.active_status == '0') {
				this.toast.show({message: '会员激活失败',duration:3000,cssClass:'danger'});
			} else if (data!=undefined  && data.active_status == '1')  {
				this.storage.set('user',data.user_info);
				this.pushPage();
			}
		});
	}

	//办理会员成功后
	pushPage(): void {
		let user: UserModel;
		this.storage.get('user').then((userdata) => {
			if (userdata) {
				user = userdata;
				if (user.is_reg_mer == '0') {
					this.navCtrl.push(OpenMerchantPage);
				} else {
					this.storage.get('repaymentPlan').then((repaymentData) => {
						if (repaymentData) {
							this.appApi.createRepaymentPlan(repaymentData).subscribe(data => {
								this.toast.show({
									message: '创建计划成功',
									callback: () => {
										this.navCtrl.push(RepayListPage);
									}
								})
							});
						}
					});
				}
			}
		});
	}
}

