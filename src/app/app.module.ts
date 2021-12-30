import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { DialogModule } from './dialog/dialog.module';
import { AppRoutingModule } from './app-routing.module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';// optional, provide

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { SearchDataModule } from './search-data/search-data.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UserManagementModule } from './user-management/user-management.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
	  HttpClientModule,
	  BrowserAnimationsModule,
	  FormsModule,
	  DialogModule,
	  ReactiveFormsModule,
	  FlexLayoutModule,
    AppRoutingModule,
	  HttpModule,
	  MaterialModule,
	  RouterModule,
    MomentModule,
	  LoginModule,
    HomeModule,
    SearchDataModule,
    UploadFileModule,
    UserManagementModule,
    RecaptchaModule,
	  NgIdleKeepaliveModule.forRoot()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpModule, { provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe],
})
export class AppModule { }
