import { Injectable } from '@angular/core';
import { AppHttp } from '../app-http/app-http';


@Injectable()
export class AppApi {
	constructor(private _http: AppHttp) { }
	login(opts?: any): any {
		return this._http.post('UserLogin', 1101, opts);
	}
	logout(opts: any): any {
		return this._http.post('UserLogout', 1103, opts);
	}
	getCode(opts: any): any {
		return this._http.post('GetSmsValidCode', 1001, opts);
	}
	acctDetailQuery(opts: any): any {
		return this._http.post('AcctDetailQuery', 1124, opts);
	}
	acctQuery(): any {
		return this._http.post('AcctQuery', 1125);
	}
	userChnlQuery(opts: any): any {
		return this._http.post('UserChnlQuery', 1104, opts);
	}
	getBindCardList(opts: any): any {
		return this._http.post('GetBindCardList', 1127, opts);
	}
	getColl(opts: any): any {
		return this._http.post('Coll', 1201, opts);
	}
	getBankInfoByCrdNo(opts:any):any{
		return this._http.post('GetBankInfoByCrdNo', 1129, opts);
	}
	getRepaymentList(): any {
		return this._http.post('GetRepaymentPlanList', 1151);
	}
	getRepaymentInfo(opts: any): any {
		return this._http.post('GetRepaymentPlanDetail', 1152, opts);
	}
	getMinSinglePayAmount(opts: any): any {
		return this._http.post('GetMinSinglePayAmount', 1502, opts);
	}
	bindBankCard(opts:any):any{
		return this._http.post('BindBankCard', 1128, opts);
	}
	createRepaymentPlan(opts:any):any{
		return this._http.post('CreateRepaymentPlan', 1501, opts);
	}
	invitationCodeVertify(opts:any):any{
		return this._http.post('InvitationCodeVertify', 1503, opts);
	}
	getProvinceList():any{
		return this._http.post('GetProvinceList', 1131);
	}
	getCityList(opts:any):any{
		return this._http.post('GetCityList', 1132,opts);
	}
	getBankBranchList(opts:any):any{
		return this._http.post('GetBankBranchList', 1133,opts);
	}
	userMerInfo(opts:any):any{
		return this._http.post('UserMerInfo', 1153,opts);
	}
	updatePayPwd(opts:any):any{
		return this._http.post('UpdatePayPwd', 1114,opts);
	}
	setPayPwd(opts:any):any{
		return this._http.post('SetPayPwd', 1113,opts);
	}
	feedbackSubmit(opts:any):any{
		return this._http.post('FeedbackSubmit', 1150,opts);
	}
	/**
	 * 账户收益查询
	 *
	 * @returns {*}
	 * @memberof AppApi
	 */
	acctIncomeQuery():any{
		return this._http.post('AcctIncomeQuery', 1121);
	}
	/**
     * 账户收益分类统计说明：
     */
    acctIncomeByTypeQuery():any{
        return this._http.post('AcctIncomeByTypeQuery', 1122);
    }
    /**
     * 账户收益明细
     */
    acctIncomeDetailQuery(opts:any):any{
        return this._http.post('AcctIncomeDetailQuery', 1123,opts);
    }
	payment(url:string,opts:any):any{
		return this._http.form(url,opts);
	}
	/**
     * 分润明细接口
     */
    profitInfoQuery(opts:any):any{
        return this._http.post('ProfitInfoQuery', 1126,opts);
	}

	/**
     * 二维码
     */
	qRcodePayServer(opts:any):any{
        return this._http.post('QRcodePayServer', 1202,opts);
	}
	/**
     * 获取最新用户信息
     */
	getUserInfo():any{
        return this._http.post('GetUserInfo', 1155);
	}

	/**
     * 获取会员价格
     */
	getMemberPrice():any{
        return this._http.post('GetMemberPrice', 1156);
	}
	/**
	 * 获取单笔最小还款金额说明
	 * @param opts 
	 */
	getSecurityDeposit(opts: any): any {
		return this._http.post('GetSecurityDeposit', 1504, opts);
	}

	withdraw(opts: any): any {
		return this._http.post('Withdraw', 1203, opts);
	}

	/**
	 * 获取保证金比例
	 * @param opts 
	 */
	getSecurityDepositRate(opts: any): any {
		return this._http.post('GetSecurityDepositRate', 1505, opts);
	}
}
