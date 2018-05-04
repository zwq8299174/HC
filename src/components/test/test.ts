import { Component } from '@angular/core';


@Component({
	selector: 'test',
	templateUrl: 'test.html'
})
export class TestComponent {

	text: string;

	constructor() {
		console.log('Hello TestComponent Component');
		this.text = 'Hello World';
	}

}
