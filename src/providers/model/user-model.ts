
import { Injectable } from '@angular/core';

@Injectable()
export class UserModel {
    /**
     * 身份证号
     */
    identify_no:string;

    /**
     * 会员激活状态 0未激活 1已激活
     */
    is_active:string;

    /**
     * 姓名
     */
    user_name:string;

    /**
     * 还款计划数量
     */
    repayment_plan_num:string;

    /**
     * 手机号
     */
    mobile:string;
    /**
     * 头像
     */
    photo:string;
    /**
     * 是否启用指纹认证 0未启用 1启用
     */
    isFingerPrintVerify:string;

    /**
     * 登录名
     */
    login_name:string;

    /**
     * 用户ID
     */
    user_id:string;
    /**
     * 接口编号
     */
    request_code:string;

    /**
     * 登陆用户token
     */
    login_token:string;

    /**
     * 是否注册商户 0未注册 1已注册
     */
    is_reg_mer:string;

    /**
     * 认证状态 0未认证 1已认证 2已停用
     */
    status:string;
	/**
	 * [用户分享图片]
	 * @type {string}
	 */
    share_img:string;
    /**
     * 发展人
     */
    open:string;
}
