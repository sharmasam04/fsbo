import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabsModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserManagementService } from './user-management.service';
import { DialogService } from '../dialog/dialog.service';
import { User } from './user';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {


  @Input('dataSource') dataSource: MatTableDataSource<any>;
  @Input() inputData;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  columnList: any[];
  displayedColumns: string[];
  model: User = new User();
  dataList: any[] = [];
  array: any;
  showLoad: boolean = true;
  countTotal = 0;
  currentPage = 0;
  role: string;
  scrollTopPosition: number;
  position: number = 0;


  constructor(
    private userDataService: UserManagementService,
    private dialogService: DialogService,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.columnList = [
      { key: 'AutoID', title: 'AutoID' },
      { key: 'Name', title: 'Name' },
      { key: 'LoginID', title: 'Login Id' },
      { key: 'Role', title: 'Role' },
      { key: 'Status', title: 'Status' }
    ];
    this.displayedColumns = this.columnList.map(x => x.key);
    this.displayedColumns = this.displayedColumns.concat(['action']);
    let username = localStorage.getItem('username');
    this.loginService.getUserProfile(username).then(response => {
      let obj = response.json();
      let rs = JSON.parse(obj.d);
      this.role = rs[0].Role;
      this.getAllUsers();
    }, error => {
      this.dialogService.openAlertDialog({
        message: error.statusText
      });
    });
  }

  onScroll(event: any) {
    if (this.position != null)
      this.scrollTopPosition = event.target.scrollTop;
  } 

  getAllUsers() {
    this.showLoad = true;
    this.userDataService.getAllUsers().then(
      response => {
        if (response) {
          let obj = response.json();
          this.dataList = JSON.parse(obj.d);
          console.log(this.dataList);
          this.dataSource = new MatTableDataSource(this.dataList);
          this.array = this.dataList;
        } else {
          this.showLoad = false;
          this.dataSource.paginator = this.paginator;
          this.countTotal = this.array.length;
        }
        if (this.position == 0)
          this.scrollTopPosition = this.position;
        this.showLoad = false;
        this.position = 0;	
      },
      error => {
        this.dialogService.openAlertDialog({
          message: error.statusText
        });
        this.showLoad = false;
      }); 
  }

  insertUser(row) {
    this.showLoad = true;
    this.userDataService.addUser(row).then(
      response => {
        if (response) {
          let obj = response.json();
          let result = JSON.parse(obj.d);
          if (result) {
            this.dialogService.openAlertDialog({
              message: "User created successfully",
              disabledClose: true
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.getAllUsers();
            });
          } else {
            this.dialogService.openAlertDialog({
              message: "Failed to create user.",
              disabledClose: true
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.getAllUsers();
            });
          }
            
        } else {
          this.showLoad = false;
        }
      },
      error => {
        this.dialogService.openAlertDialog({
          message: error.statusText
        });
        this.showLoad = false;
      });
  }

  updateUser(row) {
    this.showLoad = true;
    this.userDataService.updateUser(row).then(
      response => {
        if (response) {
          let obj = response.json();
          let result = JSON.parse(obj.d);
          if (result) {
            this.dialogService.openAlertDialog({
              message: "User updated successfully.",
              disabledClose: true
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.getAllUsers();
            });
          } else {
            this.dialogService.openAlertDialog({
              message: "Failed to update user.",
              disabledClose: true
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.getAllUsers();
            });
          }
        } else {
          this.showLoad = false;
        }
      },
      error => {
        this.dialogService.openAlertDialog({
          message: error.statusText
        });
        this.showLoad = false;
      });
  }

  addUser() {
    this.dialog.open(AddUserComponent, {
      data: {
        mode: 'add',
      }
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.insertUser(result);
      }
    });
  }

  editUser(row) {
    this.dialog.open(AddUserComponent, {
      data: {
        mode: 'edit',
        model: row,
      }
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.updateUser(result);
      }
    });
  }

  resetPassword(row) {
    this.dialog.open(AddUserComponent, {
      data: {
        mode: 'reset',
        model: row,
      }
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.updateUser(result);
      }
    });
  }

}
