//Angular
import { NgModule,ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//Ionic
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

//Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { IndexPage } from '../pages/index/index';
import { ShareProfitPage } from '../pages/share-profit/share-profit';
import { HelloPage } from '../pages/public/hello/hello';
//Modules
import { ComponentsModule } from '../components/components.module';
import { DirectivesModule } from '../directives/directives.module';
import { ProvidersModule } from '../providers/providers.module';
import { PipesModule } from '../pipes/pipes.module';
import { PublicModule } from '../pages/public/public.module';
import { PePayModule } from '../pages/repayment/repay.module';
import { PayModule } from '../pages/payment/pay.module';
import { UserModule } from '../pages/user-center/user.module';
import { ShareModule } from '../pages/share/share.module';

//Ionic-native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Clipboard } from '@ionic-native/clipboard';
import { CodePush } from '@ionic-native/code-push';
import { IS_DEBUG, FUNDEBUG_API_KEY } from '../providers/base-set/base-set';
import { JPush } from '@jiguang-ionic/jpush';
import { Device } from '@ionic-native/device';

//参考文档:https://docs.fundebug.com/notifier/javascript/framework/ionic2.html
import * as fundebug from 'fundebug-javascript';

fundebug.apikey = FUNDEBUG_API_KEY;
fundebug.releasestage = IS_DEBUG ? 'development' : 'production';//应用开发阶段，development:开发;production:生产

export class FunDebugErrorHandler implements ErrorHandler {
	handleError(err: any): void {
		fundebug.notifyError(err);
		console.error(err);
	}
}

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
		IndexPage,
		ShareProfitPage,
		HelloPage
	],
	imports: [
		PublicModule,
		PePayModule,
		PayModule,
		UserModule,
		ShareModule,
		PipesModule,
		ComponentsModule,
		FormsModule,
		BrowserModule,
		DirectivesModule,
		ProvidersModule,
		IonicModule.forRoot(MyApp, {
			backButtonText: '',
			tabsHideOnSubPages: true,
			swipeBackEnabled: true
		}),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage,
		IndexPage,
		ShareProfitPage,
		HelloPage
	],
	providers: [
		Device,
		JPush,
		CodePush,
		Clipboard,
		PhotoLibrary,
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: FunDebugErrorHandler }
	]
})
export class AppModule { }
