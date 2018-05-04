import { Component,NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { CodePush } from '@ionic-native/code-push';
import { JPush } from '@jiguang-ionic/jpush';

import { HelloPage } from '../pages/public/hello/hello';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CODE_PUSH_DEPLOYMENT_KEY,IS_DEBUG } from '../providers/base-set/base-set';
import { ToolsProvider } from '../providers/tools/tools';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any = '';
	// rootPage: any = LoginPage;
	current:any;
	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		private storage: Storage,
		private codePush: CodePush,
		private tools: ToolsProvider,
		private zone:NgZone,
		private jpush:JPush
	) {
		platform.ready().then(() => {
			statusBar.styleDefault();
			splashScreen.hide();
			this.getOfflineData();
			if (this.tools.isMobile()) {
				this.cheackAssets();
				jpush.init();
      			// jpush.setDebugMode(true);
			}
		});
	}
	cheackAssets(): void {
		const downloadProgress = (progress) => {
			this.zone.run(()=>{
				this.current = Math.floor((progress.receivedBytes/progress.totalBytes)*100);
			});
		}
		let deploymentKey:string;
		if(this.tools.isIos()){
			if(IS_DEBUG){
				deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Staging;
			}else{
				deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Production;
			}
		};
		if(this.tools.isAndroid()){
			if(IS_DEBUG){
				deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Staging;
			}else{
				deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Production;
			}
		};
		this.codePush.sync({
			deploymentKey: deploymentKey
		},downloadProgress).subscribe(syncStatus => {
			console.log(syncStatus);
		})
	}
	getOfflineData(): void {
		this.storage.get('start').then((data) => {
			if (!data) {
				this.rootPage = HelloPage;
			} else {
				this.storage.get('user').then((data) => {
					console.log(data);
					if (data) {
						this.rootPage = HomePage;
					} else {
						this.rootPage = LoginPage;
					}
				});
			}
		});
	}
}
