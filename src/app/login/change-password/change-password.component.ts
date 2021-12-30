import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { DialogService } from '../../dialog/dialog.service';
import { Login } from '../login';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  showError = false;
  errorMessage: string;
  model: Login = new Login('', '');
  username: string;
  newPassword: string;
  repeatPassword: string;

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    @Optional() private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  close(success) {
    this.dialogRef.close();
  }

  resetPassword() {
    this.showError = false;
    if (this.newPassword == this.repeatPassword) {
      this.model.username = this.username;
      this.model.password = this.newPassword;
      this.dialogRef.close(this.model);
    } else {
      this.showError = true;
      this.errorMessage = 'New password and repeat password should be equal. Please try again';
    }
    
  }

}
