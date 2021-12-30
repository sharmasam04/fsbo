import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { UserManagementComponent } from '../user-management/user-management.component';
import { UserManagementService } from '../user-management/user-management.service';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, MaterialModule, FlexLayoutModule, ReactiveFormsModule
  ],
  declarations: [
    UserManagementComponent, AddUserComponent
  ],
  exports: [
    UserManagementComponent, AddUserComponent
  ],
  providers: [
    UserManagementService
  ],
  entryComponents: [
    UserManagementComponent, AddUserComponent
  ]
})
export class UserManagementModule { }
