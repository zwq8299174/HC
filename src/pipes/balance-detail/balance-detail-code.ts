import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'balanceDetailCode',
})
export class BalanceDetailCodePipe implements PipeTransform {

    transform(value: string, ...args) {

        let display = '';
        if (value == 'recharge') {
            display = '充值';
        } else if (value == 'withdraw') {
            display = '提现';
        } else {
            display = '分润';
            if (args) {
                switch (args[0]) {
                    case 'buyMember':
                        display = display + ' - 购买会员(充值)';
                        break;
                    case 'repayment':
                        display = display + ' - 还款计划';
                        break;
                    case 'collect':
                        display = display + ' - 收款';
                        break;

                    default:
                        display = display + ' - 提现';
                        break;
                }

            }

        }
        return display;
    }
}