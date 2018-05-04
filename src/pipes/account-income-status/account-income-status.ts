import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'accountIncomeStatus',
})
export class AccountIncomeStatusPipe implements PipeTransform {
    transform(value: string,status:boolean) {
        if (status) {
            return value;
        }else{
            return '***';
        }
    }
}
