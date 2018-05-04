//app指令模块，使用ionic命令生成的指令会自动加载到本模块中，请勿手动维护。

import { NgModule } from '@angular/core';
import { TestDirective } from './test/test';
@NgModule({
	declarations: [TestDirective],
	imports: [],
	exports: [TestDirective]
})
export class DirectivesModule {}
