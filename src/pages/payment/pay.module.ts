import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';

import { PaySelectCardPage } from './pay-select-card/pay-select-card';
import { PaymentPage } from './payment';
import { PaymentListPage } from './payment-list/payment-list';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		PaymentPage,
		PaySelectCardPage,
		PaymentListPage
	],
	imports: [
		IonicModule,
		FormsModule,
		PipesModule
	],
	entryComponents: [
		PaymentPage,
		PaySelectCardPage,
		PaymentListPage
	]
})
export class PayModule {}
