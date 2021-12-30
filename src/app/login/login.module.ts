import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginService } from './login.service';
//import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, MaterialModule, FlexLayoutModule, RouterModule, RecaptchaModule
	],
	declarations: [
		LoginComponent
		//ChangePasswordComponent
	],
	exports: [
		LoginComponent
	],
	providers: [
		LoginService
	]
})
export class LoginModule { }
