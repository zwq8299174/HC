import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'balanceDetailName',
})
export class BalanceDetailNamePipe implements PipeTransform {

    transform(value: string, ...args) {
        let display = '';

        switch (value) {
            case '1':
                display = '分润明细';
                break;
            case '2':
                display = '充值明细';
                break;
            case '3':
                display = '提现明细';
                break;

            default:
                display = '贷款明细';
                break;
        }
        return display;
    }
}