import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'balanceDetailAmount',
})
export class BalanceDetailAmountPipe implements PipeTransform {

    transform(value: string, ...args) {
        if (args[0] == 'withdraw') {
            value = '-'+value;
        }else{
            value = '+'+value;
        }
        return value;
    }
}