import {Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'repa'
})
@Injectable()
export class TestPipe implements PipeTransform {
	transform(status: number, ...args) {
		let display: string = '';
		switch (status) {
			case 0: display = '创建计划'
				break;
			case 1: display = '进行中'
				break;
			case 2: display = '已完成'
				break;
			case 3: display = '执行失败'
				break;
		};
		return display;
	}
}
