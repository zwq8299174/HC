import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
	name: 'hiddenMobile',
})
export class HiddenMobilePipe implements PipeTransform {
	transform(value: string, ...args) {
		if (value) {
			const reg = /^(\d{3})\d{4}(\d{4})$/;
			return value.toString().replace(reg, '$1****$2');
		}
	}
}
