import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'repayStatus',
})
export class RepayStatusPipe implements PipeTransform {
	transform(status: any, ...args) {
		let display: string = '无';
		let cless:string = '';
		switch (status) {
			case '0': display = '创建计划';cless = 'color-warning';
				break;
			case '1': display = '执行中';cless = 'color-primary';
				break;
			case '2': display = '已完成';cless = 'color-success';
				break;
			case '3': display = '执行失败';cless = 'color-danger';
				break;
			case '4': display = '重新生成计划';cless = 'color-secondary';
				break;
		};
		if(args[0]=='status'){
			return display;
		}else{
			return cless;
		}

	}
}
