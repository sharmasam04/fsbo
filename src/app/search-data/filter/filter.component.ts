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
import { Data } from '../data';
import * as _moment from 'moment';

export interface selectModel {
  value: string;
  viewValue: string;
}

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
  ]
})
export class FilterComponent implements OnInit {

  model: Data = new Data();
  mode: string;
  showError: boolean = false;
  errorMessage: string;
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
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    @Optional() private dialogRef: MatDialogRef<FilterComponent>
  ) { }

  ngOnInit() {
    
    this.model.PhoneNo = '';
    this.model.ICNo = '';
    this.model.FullName = '';
    this.model.Addresskeywords = '';
    this.model.PostCode = '';
    this.model.State = '';
    this.model.Gender = '';
    //this.model.Age = '';
    this.model.Race = '';
    this.mode = this.data.mode;
  }

  update() {
    if (this.model.FullName != '' || this.model.Addresskeywords != '' || this.model.PostCode != '' || this.model.State != '' || this.model.Gender != '' || this.model.Race != '' || this.model.ICNo != '') {
      this.dialogRef.close(this.model);
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill up in any field!'
    }
  }

  close() {
    this.dialogRef.close(null);
  }

}
