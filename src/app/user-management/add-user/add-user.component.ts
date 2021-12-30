import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatTabsModule, DateAdapter } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { DialogService } from '../../dialog/dialog.service';
import { User } from '../user';

export interface selectModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  model: User = new User();
  mode: string;
  Roles: selectModel[] = [
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'Agent', viewValue: 'Agent' }
  ];
  Statuses: selectModel[] = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Deactive', viewValue: 'Deactive' }
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    @Optional() private dialogRef: MatDialogRef<AddUserComponent>
  ) { }

  ngOnInit() {
    this.mode = this.data.mode;
    if (this.mode == 'edit') {
      this.model = this.data.model;
    } else if (this.mode == 'reset'){
      this.model = this.data.model;
      this.model.Password = "";
    }
  }

  update() {
    this.dialogRef.close(this.model);
  }

  reset() {
    if (this.model.Password != "") {
      this.dialogRef.close(this.model);
    } else {
      this.dialogService.openAlertDialog({
        message: "Plese enter the password!"
      });
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
