import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';


@Injectable()
export class ToolsProvider {
	constructor(
		private platform: Platform
	) { }
	sliceArr(array, size): any {
		var result = [];
		for (var x = 0; x < Math.ceil(array.length / size); x++) {
			var start = x * size;
			var end = start + size;
			result.push(array.slice(start, end));
		};
		return result;
	}
	offlineSet(name: string, data: any): void {
		if (data === undefined || data === null) return;
		localStorage.setItem(name, JSON.stringify(data));
	}
	offlineGet(name: string): any {
		return localStorage.getItem(name) && localStorage.getItem(name) != 'undefined' && localStorage.getItem(name) != 'null' ? JSON.parse(localStorage.getItem(name)) : undefined;
	}
	offlineRemove(name: string): any {
		let item = localStorage.getItem(name) && localStorage.getItem(name) != 'undefined' && localStorage.getItem(name) != 'null' ? JSON.parse(localStorage.getItem(name)) : undefined;
		localStorage.removeItem(name);
		return item;
	}
	extend(destination, source): any {
		for (var property in source) {
			destination[property] = source[property];
		};
		return destination;
	}
	/**
   * 是否真机环境
   */
	isMobile(): boolean {
		return this.platform.is('mobile') && !this.platform.is('mobileweb');
	}

	/**
	 * 是否android真机环境
	 */
	isAndroid(): boolean {
		return this.isMobile() && this.platform.is('android');
	}

	/**
	 * 是否ios真机环境
	 */
	isIos(): boolean {
		return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
	}
}
