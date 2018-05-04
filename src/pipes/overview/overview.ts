import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OverviewPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'overview',
})
export class OverviewPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let display = '未知';
    switch(value){
      case 'repayment': display = '分润收益'
      break;
      case 'buyMember': display = '分享收益'
      break;
      case 'collect': display = '收款'
      break;
      case 'withdraw': display = '提现'
      break;
    };
    return display;
  }
  
}
