import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shareProfitType',
})
export class ShareProfitTypePipe implements PipeTransform {
  transform(value: string, ...args) {
    let name = '';
    switch (value) {
      case 'buyMember':
        name = '购买会员';
        break;
      case 'repayment':
        name = '还款计划';
        break;
      case 'collect':
        name = '收款';
        break;

      default:
        name = '提现';
        break;
    }

    return name;
  }
}
