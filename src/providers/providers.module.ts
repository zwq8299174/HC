//APP服务模块，使用ionic命令生成的服务不会自动加载到本模块中，需手动加入到本模块中。命令生成的服务会自动添加到app.modules文件中，如果你将服务添加到本模块中，记得把对应的服务名称从app.modules中删除，避免重复注入。
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppApi } from './app-api/app-api';//app所有和后台通讯的api列表
import { AppHttp } from './app-http/app-http';//对app发送的所有请求封装
import { ToolsProvider } from './tools/tools';//工具类
import { ToasterProvider } from './toaster/toaster';
import { UserModel } from './model/user-model';
import { bankCardModel } from './model/bank-card-model';
import { TabsChangeService } from './service/tabs-change.service';
import { WechatProvider } from './wechat/wechat';
import { BaseSet } from './base-set/base-set';


@NgModule({
	imports: [
		HttpModule,
		HttpClientModule
	],
	exports: [],
	providers: [
		BaseSet,
		AppApi,
		AppHttp,
		ToolsProvider,
		ToasterProvider,
		UserModel,
		bankCardModel,
		TabsChangeService,
		WechatProvider
	]
})
export class ProvidersModule {}
