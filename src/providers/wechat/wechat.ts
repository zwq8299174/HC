import { Injectable } from '@angular/core';
import {ToasterProvider}from '../toaster/toaster';


@Injectable()
export class WechatProvider {
	constructor(
		private toaster:ToasterProvider
	) {}
	share(opts?:any,scene?:any):any{
		console.log(scene);
		if (typeof window.Wechat === 'undefined') {
			let toast = this.toaster.show({
				message:'微信未安装',
				cssClass:'danger'
			});
            return false;
        };
		let defaults:any = {
            scene: scene!=undefined?scene:1,
			message:{
				title: 'test',
                description: 'Sending from test application',
                mediaTagName: 'TEST-TAG-001',
                messageExt: '这是第三方带的测试字段',
                messageAction: '<action>dotalist</action>',
                media: {}
			}
        };
		defaults.message = (<any>Object).assign(defaults.message, opts);
		// let params:any = (<any>Object).assign({}, defaults);
		console.log(defaults);
		window.Wechat.share(defaults,  ()=> {
			let toast = this.toaster.show({
				message:'分享成功',
				duration:2000
			});
		}, (reason)=> {
			let toast = this.toaster.show({
				message:'分享失败',
				cssClass:'danger',
				duration:2000
			});
		});
		return true;
	}
}
