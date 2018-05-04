import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'repayInfoStatus',
})
export class RepayInfoStatusPipe implements PipeTransform {
	transform(status: any, ...args) {
		let display: string = '无';
		let cless:string = '';
		switch (status) {
			case '':
			case '0': display = '待执行';cless = 'color-warning';
				break;
			case '1': display = '执行中';cless = 'color-primary';
				break;
			case '2': display = '完成';cless = 'color-success';
				break;
			case '3': display = '异常终止';cless = 'color-danger';
				break;
		}
		if(args[0]=='status'){
			return display;
		}else{
			return cless;
		}
	}
}
