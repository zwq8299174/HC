import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'RMB',
})
export class RmbPipe implements PipeTransform {
	transform(value: any, ...args) {
		value = value.toString();
		let result: string = '';
		var newStr = '';
		var count = 0;
		if (value.indexOf('.') == -1) {
			for (let i = value.length - 1; i >= 0; i--) {
				if (count % 3 == 0 && count != 0) {
					newStr = value.charAt(i) + ',' + newStr;
				} else {
					newStr = value.charAt(i) + newStr;
				};
				count++;
			}
			result = newStr + '.00'; //自动补小数点后两位
		}else {
			for (let i = value.indexOf('.') - 1; i >= 0; i--) {
				if (count % 3 == 0 && count != 0) {
					newStr = value.charAt(i) + ',' + newStr; //碰到3的倍数则加上“,”号
				} else {
					newStr = value.charAt(i) + newStr; //逐个字符相接起来
				}
				count++;
			}
			result = newStr + (value + '00').substr((value + '00').indexOf('.'), 3);
		}
		return result;
	}
}
