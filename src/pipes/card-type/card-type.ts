import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'cardType',
})
export class CardTypePipe implements PipeTransform {
	transform(value: string, ...args) {
		let display = '银行卡';
		switch(value){
			case '01': display = '储蓄卡'
			break;
			case '02': display = '信用卡'
			break;
			case undefined: display = ''
			break;
		};
		return display;
	}
}
