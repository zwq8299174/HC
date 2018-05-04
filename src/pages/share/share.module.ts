
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';


import { SharePage } from './share';
import { SharePanelPage } from './share-panel/share-panel';


import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
	declarations: [
		SharePage,
		SharePanelPage
	],
	imports: [
		IonicModule,
		FormsModule,
		PipesModule
	],
	entryComponents: [
		SharePage,
		SharePanelPage
	]
})
export class ShareModule { }
