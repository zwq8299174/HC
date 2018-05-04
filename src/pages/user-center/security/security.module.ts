
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';


import { SecurityPage } from './security';
import { PasswordPage } from './password/password';
import { PasswordSettingPage}from'./password/password-setting/password-setting';
import { PasswordForgetPage}from'./password/password-forget/password-forget';

import { PipesModule } from '../../../pipes/pipes.module';
@NgModule({
	declarations: [
		SecurityPage,
		PasswordPage,
		PasswordForgetPage,
		PasswordSettingPage
	],
	imports: [
		IonicModule,
		FormsModule,
		PipesModule
	],
	entryComponents: [
		SecurityPage,
		PasswordPage,
		PasswordForgetPage,
		PasswordSettingPage
	]
})
export class SecurityModule { }
