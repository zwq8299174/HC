//App组件模块,使用ionic生成的组件文件会自动加载到本模块中，无需手动加载。


import { NgModule } from '@angular/core';
import { TestComponent } from './test/test';
@NgModule({
	declarations: [TestComponent],
	imports: [],
	exports: [TestComponent]
})
export class ComponentsModule {}
