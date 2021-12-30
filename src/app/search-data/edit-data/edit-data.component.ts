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

export interface selectModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {

  model: Data = new Data();
  mode: string;
  showError: boolean = false;
  isReviewed: boolean = false;
  errorMessage: string;
  Remarks = [];
  username: string;
  Genders: selectModel[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' }
  ];
  States: selectModel[] = [
    { value: 'kuala lumpur', viewValue: 'Kuala Lumpur' },
    { value: 'selangor', viewValue: 'Selangor' },
    { value: 'johor', viewValue: 'Johor' },
    { value: 'negeri sembilan', viewValue: 'Negeri Sembilan' },
    { value: 'kedah', viewValue: 'Kedah' },
    { value: 'kelantan', viewValue: 'Kelantan' },
    { value: 'terengganu', viewValue: 'Terengganu' },
    { value: 'perak', viewValue: 'Perak' },
    { value: 'pahang', viewValue: 'Pahang' },
    { value: 'pulau pinang', viewValue: 'Pulau Pinang' },
    { value: 'perlis', viewValue: 'Perlis' },
    { value: 'melaka', viewValue: 'Melaka' },
    { value: 'sabah', viewValue: 'Sabah' },
    { value: 'sarawak', viewValue: 'Sarawak' },
    { value: 'putrajaya', viewValue: 'Putrajaya' },
    { value: 'labuan', viewValue: 'Labuan' }
  ];
  Races: selectModel[] = [
    { value: 'malay', viewValue: 'Malay' },
    { value: 'chinese', viewValue: 'Chinese' },
    { value: 'indian', viewValue: 'Indian' },
    { value: 'others', viewValue: 'Other' }
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private searchDataService: SearchDataService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    @Optional() private dialogRef: MatDialogRef<EditDataComponent>
  ) { }

  ngOnInit() {
    this.mode = this.data.mode;
    this.username = localStorage.getItem('username');
    if(this.mode == 'edit-data'){
      let result = this.data.model;
      this.searchDataService.getAllData(result.ListingID, this.username, 'Admin').then(response => {
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
          pageSize: 25,
          pageStart: 0,
          remark: '',
          remarks: []
        };
        this.getUserComments(this.model.ListingID, this.username);
      });
    }
  }

  getUserComments(listingId, username) {
    this.searchDataService.getUserComments(listingId).then(response => {
      let obj = response.json();
      let remark = JSON.parse(obj.d);
      this.Remarks = remark;
      this.isReviewed = this.Remarks.length > 0 ? true : false;
    }, error => {

    });
  }

  updateData(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(this.model);
    } else {
      this.showError = true;
      this.errorMessage = 'error occured in form. please fix it then try again!'
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
