import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	name: 'repayInfoType',
})
export class RepayInfoTypePipe implements PipeTransform {

	transform(value: string, ...args) {
		let display = '无';
		switch (value) {
			case '1': display = '还款'; break;
			case '2': display = '消费'; break;
		}
		return display;
	}
}
