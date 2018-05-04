import { Injectable } from '@angular/core';

@Injectable()
export class bankCardModel {
    /**
     * 证件ID
     * 
     * @type {string}
     * @memberof bankCardModel
     */
    identify_no:string;
    
    
    bank_vaildcode:string; 
    cvv2:string;
    bank_phonenumber:string;
    user_name:string;
    bill_day:string;
    serv_name:string;
    open_bank_city:string;
    open_bank_province:string;
    card_no:string;
    repayment_date:string;
    branch_id:string;
    branch_name:string;
    credit_limit:string;
    bank_name:string;
    expdate:string;
}

// identify_no	        text	1	证件ID
// bank_vaildcode	    text	1	银行验证码
// cvv2	                text	0	CVV2
// bank_phonenumber 	text	1	银行预留手机号
// user_name	        text	1	用户姓名
// bill_day	            text	0	账单日
// serv_name	        text	1	接口名称
// open_bank_city	    text	0	开户行所在市
// open_bank_province	text	0	开户行所在省
// card_no	            text	1	银行卡号
// repayment_date	    text	0	还款日
// branch_id	        text	0	联行号
// branch_name	        text	0	支行名称
// credit_limit	        text	0	还款额度
// bank_name	        text	1	银行名称
// request_code	        text	1	接口编号
// expdate          	text	0	有效期