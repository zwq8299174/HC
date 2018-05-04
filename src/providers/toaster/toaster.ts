import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ToolsProvider } from '../tools/tools';

interface OPTS {
	message?: string;//提示信息,默认为'';
	callback?: any;//提示框消失回调函数,默认为()=>{};
	duration?: any;//提示框持续时间,默认为1000毫秒;
	position?: string;//提示框位置,默认为'top';
	cssClass?:string;//提示框自定义class,默认为'',如需添加多个class,请以空格分割;
	showCloseButton?:boolean;//是否显示关闭按钮,默认false;
	closeButtonText?:string;//关闭按钮显示文字,默认'Close';
	dismissOnPageChange?:boolean;//是否在跳转页面时消失,默认'false';
}
@Injectable()
export class ToasterProvider {
	constructor(
		private toastCtr: ToastController,
		private tools: ToolsProvider
	) { }
	show(opts?: OPTS): any {
		let options: OPTS = {
			message: '',
			callback: () => { },
			position: 'top',
			cssClass: 'success',
			showCloseButton:true,
			closeButtonText:'关闭',
			dismissOnPageChange:true
		};
		let defaults = Object.assign({},options, opts);
		let callback = defaults.callback;
		delete defaults.callback;
		let toast = this.toastCtr.create(defaults);
		toast.onDidDismiss(() => {
			callback();
		});
		toast.present();
		return toast;
	}
}
