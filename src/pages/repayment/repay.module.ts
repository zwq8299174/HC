
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FormsModule }   from '@angular/forms';

import { RepayListPage } from './repay-list/repay-list';
import { RepaymentInfoPage } from './repayment-info/repayment-info';
import { RepaymentPage } from './repayment';


import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		RepayListPage,
		RepaymentPage,
		RepaymentInfoPage
	],
	imports: [
		IonicModule,
		FormsModule,
		PipesModule
	],
	entryComponents: [
		RepayListPage,
		RepaymentPage,
		RepaymentInfoPage
	]
})
export class PePayModule {}
