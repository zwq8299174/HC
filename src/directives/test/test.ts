import { Directive } from '@angular/core';

/**
 * Generated class for the TestDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[test]' // Attribute selector
})
export class TestDirective {

  constructor() {
    console.log('Hello TestDirective Directive');
  }

}
