import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog, MatDialogRef, MatTabChangeEvent, MAT_DIALOG_DATA } from '@angular/material';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { DialogService } from '../dialog/dialog.service';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { SearchDataComponent } from '../search-data/search-data.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import { ChangePasswordComponent } from '../login/change-password/change-password.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showIt: boolean = false;
  canShowStockManage: boolean = false;
  redirect: string;
  errorMessage: string;
  role: string;
  
  constructor(
	private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private loginService: LoginService,
    private idle: Idle
	) { }

  ngOnInit() {
    let username = localStorage.getItem('username');
    this.loginService.getUserProfile(username).then(response => {
      let obj = response.json();
      let rs = JSON.parse(obj.d);
      this.role = rs[0].Role;
      if (this.role == 'Admin') {
        this.openMenu('Upload File');
      } else {
        this.openMenu('Search Data');
      }
    }, error => {
      this.dialogService.openAlertDialog({
        message: error.statusText
      });
    });

  }
  
  logout() {
    this.router.navigateByUrl("/login");
  }
  
  openMenu(menuDetail: string) {
    let component: any;
    let url
    switch (menuDetail) {
      case 'Dashborad':
        this.router.navigateByUrl('/home/dashboard');
        break;
      case 'Upload File':
        this.router.navigateByUrl('/home/upload-file');
        break;
      case 'Search Data':
        this.router.navigateByUrl('/home/search-data');
        break
      case 'User Management':
        this.router.navigateByUrl('/home/user-management');
        break
      case 'Comment List':
        this.router.navigateByUrl('/home/user-comment');
        break
      default:
        this.router.navigateByUrl('/home/dashboard');
        break;
    }
  }

  resetPassword() {
    this.dialog.open(ChangePasswordComponent, {
      data: {
        mode: 'change-password',
      }
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.loginService.changePassword(result).then(success => {
          if (success.status == 200 && success.ok == true) {
            this.dialogService.openAlertDialog({ message: 'Password Successfully Changed' });
          }
        }, error => {
          let err = error.json();
          if (err.code == 200) {
            this.dialogService.openAlertDialog({ message: err.data.responsemsg });
          }
        });
      }
    });
  }

}
