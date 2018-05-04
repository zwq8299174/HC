import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { ToolsProvider } from '../tools/tools';//工具类
import {BaseSet}from '../base-set/base-set';

import 'rxjs/add/operator/map';

// declare const require: any;
// require('../assets/js/jsencrypt.js');

declare const JSEncrypt: any;
//localhost
// const POSTURL = 'http://192.168.2.1:3001/index/getTopBanner';
//test
const POSTURL = '/serv/service.html';
// const POSTURL = 'http://118.31.70.14:8080';

const PUBLICKEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtZuDwsLD/QOnllH9wts2yQ51smHe61lwsHMes+fqeVSaAMrukXJjdXftkI90AozTTsrS+rXOnvamVXTEiOFi4zF7xzPRs7bp+mlyMeCERXzHaylLCK+tzi6N64/d8LzKGQPsALJ0GMCxpauEclm++59HSBx43279SPeB1cCy/kWqo/O+rV2NpZz/ha9Eqf+vnxrfGjQwjXD8A8VOKI6YtvYEedVdsox0NkaperSzgJH3gmW8QN0A4e3D94eSnAB7sqdgllC6aqxjSPqopcsNgaZG0+ebEMhUzewdaShOfr16v54eiwsyG4WeikDwsi8mZBEizwn8UNMC8ypYldzwHwIDAQAB';
const PRIVATEKEY = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwlXqDubzIPNSb3Dowr2LaK5w4zjAFthBbtw3kBAt57pmI+edg+2qi66Iw0xoFTIzyI3AfghCjVwNBirYdMX30uJrHQnEVNLcfwJXqjW0vcAUXWabjVZVI9gcviCcUwJbVMVt/UUFYV70HbUhCKSjNarELYk1DDNjfzDMCD82FJpVPfuJ81+wTEARKTo5wCvjm+eex3ySwU2SqOJz8IzE6tTyBI5eG4W5QPEddGVQ//ksXhbBGCZ9UlfQRQ0Cj5Sj018IfNaektSLbExXK0p3I8idk71lD77aqF7UiVet2U2L+tMwBSDgm+Yi0gF5vVpG3CDTQsV9hyYBKr6H34mwJAgMBAAECggEABy+eE7w8RX3MPSeCKrcIc85whhNF+wWEtubFJvFPMkAWeW+KDfVNSqICMLB2j56k4bm1d2LIoI0K8eDeNmPsN0hH7DH0/iLuDNm+gBQPTG3nlyKr2vaBo713X2TQClUoDjb6/TxmR10SsTmuRhr8sRdVaxwt/ruIG9toe/3+pBtzfH8hTWHdlp7L0RVQ89kHXA9acOZky8cEPN9rTv6AthJfZ2ZcfQ/PdhSOkxPiuQRL3LevHrDq7UUnEy5FJdzna8VB28fLvSV4cCdR2o8REvc2mYF8scrVOOph33qhesoxWLAZbSqK2reONGhqObD1QkW0D6dykL+bKcvGLA2zXQKBgQDnK6OrGEGdIzPrjKkIpER79rseEnV0RENeL+tJ1C2+8fWQUxyewwEb31NcZmTT0jyVlih1A2SFy4Jj3P4XrVpmwohDmhml9deGWeo+Oeo1C1zQl/axcquTecfHXEmMb9s/SONr6DFxKySui6BX9QioRtZTmfSIksKuEn/LgfyJVwKBgQDDjOdtGNYkp9TzmuLbBIGMeuEmtO4V9gPt6lpcnoWmEAMCr9NXRdC4xlZglYVkBpFXuUXTdhdEItdxEnMCvz96C3ddZoW8Sg7koKq2js3CfHnVDUZi95xZWaAAyuU2STZf5/oQNeNr9lIfwSYJJ7yv0sc0f0F5M5sI/XK+k3l5nwKBgDg7j1ahUeStmYWk88FcZCRbgmzwRI4BxPl2Yp/U80PNi9SNwxqDiROEobyKU+CK9Z3VpwW/y4YYWSF9snmD+8efbpIzPCX4xXKzEJ4ObIB2wR8kuCe2IzJ+nzBJrMJyuzyLuHaZRt2mhwfGgzyiKHb2tFAl1Swbtyus6FVSy2GFAoGBALWHihaGpdQlUNRLhihXCIQGVhh+gT41wPQNR5EPP3YnCwRlgEVV9CpzRCAo7Ukrp6TNwvpId9Sym1jGDaoRK7X6CvbTg3aFMUoftBoAexX+Q4L57ctVnPh88MGLmDhKwoVJbaO6wsGoShhcTxjUoJ5/hpk/QOJoe5Ve4jPz5yJ1AoGAXYhE2xhQadPPgC4jfE5YfVqKZu14SzjjhJz/JZY2uNjsv6qoCc3uVjTeSuSPTVQpK9rFOG51j127hTNmwyUyNxIoD9T/olnQr7JHkb9pPTj4B9m06cbq/xHCECp+/F9bqq7ooZJ/qZsH/wc0nj8FU9xlleeUA35E0/J3hvOWqdg=';



@Injectable()
export class AppHttp {
	constructor(
		private http: Http,
		private alertCtrl: AlertController,
		private tools: ToolsProvider,
		public baseSet :BaseSet
	) { }
	request(url:string, opts: any): any {
		return this.http.request(url, new RequestOptions(opts))
			.map(res => {
				if (res.json().return_code != 0 || res.json().return_code != '0000') {
					this.alertMsg(res.json().return_desc, '');
				} else {
					let encrypt = new JSEncrypt();
					encrypt.setPrivateKey(PRIVATEKEY);
					let sign = res.json().sign.split('#');
					sign.pop();
					let str: string = '';
					for (let item of sign) {
						str += encrypt.decrypt(item);
					};
					let data = JSON.parse(str);
					console.log(data);
					if (data.ret_code != 0) {
						this.alertMsg(data.ret_msg, '');
					} else {
						return data.data;
					}
				}
			})
	};
	post(url: string, code: Number, opts?: Object) {
		let encrypt = new JSEncrypt();
		encrypt.setPublicKey(PUBLICKEY);
		// let headers = new Headers({'Content-Type': 'application/json; charset=UTF-8'});
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			'Accept': 'application/json, text/plain, */*'
		});
		let defaultOpts = {
			tn: 1,
			version: '1.0',
			source: 'app',
			timestamp: (new Date()).getTime(),
			serv_name: url,
			request_code: code,
			user_id: -1,
			login_token: -1
		};
		//if (code != 1101 && code != 1001) {
		if (code != 1101) {
			let val = this.tools.offlineGet('user');
			if (val) {
				defaultOpts.user_id = val.user_id;
				defaultOpts.login_token = val.login_token;
			};
		};
		// console.log(defaultOpts);
		let requestOpts = (<any>Object).assign(defaultOpts, opts);
		// console.log(JSON.stringify(requestOpts));
		let sign = this.cutStr(JSON.stringify(requestOpts));
		//console.log(sign);
		// let sign = cutStr(JSON.stringify(requestOpts));
		let formData = new URLSearchParams();
		formData.set('p_id', '100010002');
		formData.set('sign_type', 'RSA');
		// formData.append('sign',encodeURIComponent(sign));
		formData.set('sign',sign);
		// console.log(formData);
		let options = {
			body: formData,
			header: headers,
			method: 'post'
		};
		return this.request(this.baseSet.baseUrl + POSTURL,options);
	};
	form(url: string,opts?: Object) {
		let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			'Accept': 'application/json, text/plain, */*'
		});
		let requestOpts = (<any>Object).assign({}, opts);
		let formData = new URLSearchParams();
		for(let item in opts){
			formData.set(item, opts[item]);
		};
		let options = {
			body: formData,
			headers: headers,
			method: 'post'
		};
		console.log(url);
		console.log(options);
		return this.request(url,options);
	};
	get(url: string, opts?: Object) {
		// console.log(opts);
		let params = new URLSearchParams();
		if (opts != undefined) {
			for (let item in opts) {
				params.set(item, opts[item]);
			}
		};
		// let body: any = {
		// 	search: params
		// }
		// let href = url.indexOf('http') > -1 ? url : BASEURL + url;
		// return this.request(href, (<any>Object).assign(body, opts));
	};
	alertMsg(tit: string, msg?: string): void {
		let alert = this.alertCtrl.create({
			title: tit ? tit : '服务器开小差了',
			message: msg ? msg : '请稍后重试',
			buttons: [
				{
					text: '确认',
					handler: () => {
						console.log('Buy clicked');
					}
				}
			]
		});
		alert.present();
	};
	cutStr(str): any {
		let encrypt = new JSEncrypt();
		encrypt.setPublicKey(PUBLICKEY);
		let arr = [];
		let flag = 100;
		for (let i = 0; i < Math.ceil(str.length / flag); i++) {
			arr.push(encrypt.encrypt(str.substr(i*flag,flag)));
		};
		// console.log(arr.join('#'));
		return arr.join('#');
	};
}
