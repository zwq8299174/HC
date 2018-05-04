//APP管道模块，使用ionic生成的管道文件会自动加载到本模块中，无需手动加载。
import { NgModule } from '@angular/core';
import { TestPipe } from './test/test';
import { RepayStatusPipe } from './repay-status/repay-status';
import { TailNumPipe } from './tail-num/tail-num';
import { CardTypePipe } from './card-type/card-type';
import { RepayInfoStatusPipe } from './repay-info-status/repay-info-status';
import { RepayInfoTypePipe } from './repay-info-type/repay-info-type';
import { HiddenMobilePipe } from './hidden-mobile/hidden-mobile';
import { RmbPipe } from './rmb/rmb';
import { UserAutonymPipe } from './user-autonym/user-autonym';
import { AccountIncomeStatusPipe } from './account-income-status/account-income-status';
import { BalanceDetailCodePipe } from './balance-detail/balance-detail-code';
import { BalanceDetailAmountPipe } from './balance-detail/balance-detail-amount';
import { OverviewPipe } from './overview/overview';
import { ShareProfitTypePipe } from './share-profit-type/share-profit-type';
import { BalanceDetailNamePipe } from './balance-detail/balance-detail-name';
@NgModule({
	declarations: [
		TestPipe,
		RepayStatusPipe,
		TailNumPipe,
		CardTypePipe,
		RepayInfoStatusPipe,
		RepayInfoTypePipe,
		HiddenMobilePipe,
		RmbPipe,
		UserAutonymPipe,
		AccountIncomeStatusPipe,
		BalanceDetailCodePipe,
		OverviewPipe,
		BalanceDetailAmountPipe,
		ShareProfitTypePipe,
		BalanceDetailNamePipe
	],
	imports: [],
	exports: [
		TestPipe,
		RepayStatusPipe,
		TailNumPipe,
		CardTypePipe,
		RepayInfoStatusPipe,
		RepayInfoTypePipe,
		HiddenMobilePipe,
		RmbPipe,
		UserAutonymPipe,
		AccountIncomeStatusPipe,
		BalanceDetailCodePipe,
		OverviewPipe,
		BalanceDetailAmountPipe,
		ShareProfitTypePipe,
		BalanceDetailNamePipe
	]
})
export class PipesModule { }
