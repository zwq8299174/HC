
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';


import { UserCenterPage } from './user-center';
import { ActivateMemberPage } from './activate-member/activate-member';
import { OpenMerchantPage } from './open-merchant/open-merchant';
import { SettingPage } from './setting/setting';
import { CardsPage } from './cards/cards';
import { BalancePage } from './balance/balance';
import { ChannelRatePage } from './channel-rate/channel-rate';
import { OverviewPage } from './overview/overview';
import { OverviewDetailPage } from './overview/overview-detail/overview-detail';
import { TextPage } from './text-page/text-page';
import { UserInfoPage } from './user-info/user-info';
import { BalanceDetailPage } from './balance/balance-detail/balance-detail';
import { BalanceHandlePage } from './balance/balance-handle/balance-handle';
import { FeedBackPage } from './feed-back/feed-back';
import { UserAgreementPage } from './user-agreement/user-agreement';
import { AboutUsPage } from './about-us/about-us';
import { OperationManualPage } from './operation-manual/operation-manual';
import { CommonProblemPage } from './common-problem/common-problem';
import { UserAvatarPage } from './user-avatar/user-avatar';


import { SecurityModule } from './security/security.module';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
	declarations: [
		UserCenterPage,
		ActivateMemberPage,
		OpenMerchantPage,
		SettingPage,
		CardsPage,
		BalancePage,
		ChannelRatePage,
		OverviewPage,
		TextPage,
		UserInfoPage,
		BalanceDetailPage,
		OverviewDetailPage,
		BalanceHandlePage,
		FeedBackPage,
		UserAgreementPage,
		AboutUsPage,
		OperationManualPage,
		CommonProblemPage,
		UserAvatarPage
	],
	imports: [
		IonicModule,
		FormsModule,
		PipesModule,
		SecurityModule
	],
	entryComponents: [
		UserCenterPage,
		ActivateMemberPage,
		OpenMerchantPage,
		SettingPage,
		CardsPage,
		BalancePage,
		ChannelRatePage,
		OverviewPage,
		TextPage,
		UserInfoPage,
		BalanceDetailPage,
		OverviewDetailPage,
		BalanceHandlePage,
		FeedBackPage,
		UserAgreementPage,
		AboutUsPage,
		OperationManualPage,
		CommonProblemPage,
		UserAvatarPage
	]
})
export class UserModule { }
