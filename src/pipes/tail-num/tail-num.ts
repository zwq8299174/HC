import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'tailNum',
})
export class TailNumPipe implements PipeTransform {
	transform(value: string, ...args) {
		if(!value) return '';
		if(args[0]=='number'){
			return value.toString().slice(-4);
		}else{
			return '尾号'+value.toString().slice(-4);
		}
	}
}
