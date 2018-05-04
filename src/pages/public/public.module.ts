import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { AddCardPage } from './add-card/add-card';
import { SelectCardPage } from './select-card/select-card';
import { WebviewPage } from './webview/webview';
import { DealPasswordPage } from './deal-password/deal-password'
import { QrcodePage } from './qrcode/qrcode';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		AddCardPage,
		SelectCardPage,
		WebviewPage,
		DealPasswordPage,
		QrcodePage
	],
	imports: [
		IonicModule,
		FormsModule,
		PipesModule
	],
	entryComponents: [
		AddCardPage,
		SelectCardPage,
		WebviewPage,
		DealPasswordPage,
		QrcodePage
	]
})
export class PublicModule { }
