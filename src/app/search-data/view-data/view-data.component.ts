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
import { SearchDataService } from '../search-data.service';
import { Data } from '../data';
import { UserComments } from '../user-comments';

export interface selectModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit {

  model: Data = new Data();
  comment: UserComments = new UserComments();
  mode: string;
  username: string;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private searchDataService: SearchDataService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    @Optional() private dialogRef: MatDialogRef<ViewDataComponent>
  ) { }

  ngOnInit() {
    this.mode = this.data.mode;
    this.model = this.data.model;
    this.username = localStorage.getItem('username');
    this.comment.listingID = this.model.ListingID;
    this.comment.username = this.username;
    if (this.mode == 'view-data') {
      let result = this.data.model;
      this.searchDataService.getAllData(result.ListingID, this.username, 'Agent').then(response => {
        let obj = response.json();
        let dataSet = JSON.parse(obj.d);
        this.model = {
          ListingID: dataSet[0]['ListingID'] == null ? "" : dataSet[0]['ListingID'],
          PhoneNo: dataSet[0]['Phone No#'] == null ? "" : dataSet[0]['Phone No#'],
          FullName: dataSet[0]['Full Name'] == null ? "" : dataSet[0]['Full Name'],
          ICNo: dataSet[0]['IC No#'] == null ? "" : dataSet[0]['IC No#'],
          //Age: dataSet[0]['Age'],
          State: dataSet[0]['State'] == null ? "" : dataSet[0]['State'].toLowerCase(),
          Add1: dataSet[0]['Address 1'] == null ? "" : dataSet[0]['Address 1'],
          Add2: dataSet[0]['Address 2'] == null ? "" : dataSet[0]['Address 2'],
          Add3: dataSet[0]['Address 3'] == null ? "" : dataSet[0]['Address 3'],
          Gender: dataSet[0]['Gender'] == null ? "" : dataSet[0]['Gender'].toLowerCase(),
          Race: dataSet[0]['Race'] == null ? "" : dataSet[0]['Race'].toLowerCase(),
          PostCode: dataSet[0]['Post Code'] == null ? "" : dataSet[0]['Post Code'],
          Addresskeywords: '',
          dateImported: new Date(),
          remark: '',
          pageSize: 25,
          pageStart: 0,
          remarks: []
        };
      });
    }    
  }

  update(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.comment);
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
