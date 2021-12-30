import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuardService,
    LoginService
  ],
  declarations: []
})
export class AuthModule { }
