import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SearchDataModule } from '../search-data/search-data.module';
import { UserCommentComponent } from '../search-data/user-comment/user-comment.component';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { UserManagementModule } from '../user-management/user-management.module';
import { ChangePasswordComponent } from '../login/change-password/change-password.component';

@NgModule({
  imports: [
		CommonModule,
		MaterialModule,
		HomeRoutingModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
    SearchDataModule,
    UploadFileModule,
    UserManagementModule,
    RouterModule,  ],
  declarations: [
    HomeComponent,
    ChangePasswordComponent,
    UserCommentComponent
  ],
  exports: [ChangePasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ChangePasswordComponent, UserCommentComponent]
})
export class HomeModule { }
