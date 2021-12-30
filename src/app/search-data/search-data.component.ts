import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabsModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { SearchDataService } from './search-data.service';
import { DialogService } from '../dialog/dialog.service';
import { LoginService } from '../login/login.service';
import { Data } from '../search-data/data';

export interface selectModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.css']
})
export class SearchDataComponent implements OnInit {

  @Input('dataSource') dataSource: MatTableDataSource<any>;
  @Input() inputData;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  columnList: any[];
  displayedColumns: string[];
  username: string;
  model: Data = new Data();
  dataList: any[] = [];
  array: any;
  showLoad: boolean = false;
  countTotal = 0;
  currentPage = 0;
  scrollTopPosition: number;
  position: number = 0;
  role: string;

  constructor(
    private searchDataService: SearchDataService,
    private dialogService: DialogService,
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.model.pageStart = 0;
    this.model.pageSize = 25;
    this.loginService.getUserProfile(this.username).then(response => {
      let obj = response.json();
      let rs = JSON.parse(obj.d);
      this.role = rs[0].Role;
      if (this.role == 'Admin') {
        this.columnList = [
          { key: 'Column1', title: 'Phone No' },
          { key: 'Full Name', title: 'Fullname' },
          { key: 'Column2', title: 'Address' },
          { key: 'Post Code', title: 'PostCode' },
          { key: 'State', title: 'State' },
          { key: 'Gender', title: 'Gender' },
          { key: 'Race', title: 'Race' },
          { key: 'IsUsertobeNotifed', title: 'User Commented' }
          // key: 'Age', title: 'Age' }
        ];
      } else {
        this.columnList = [
          { key: 'Column1', title: 'Phone No' },
          { key: 'Full Name', title: 'Fullname' },
          { key: 'Column2', title: 'Address' },
          { key: 'Post Code', title: 'PostCode' },
          { key: 'State', title: 'State' },
          { key: 'Gender', title: 'Gender' },
          { key: 'Race', title: 'Race' }
          // key: 'Age', title: 'Age' }
        ];
      }
      this.displayedColumns = this.columnList.map(x => x.key);
      this.displayedColumns = this.displayedColumns.concat(['action']);
      this.filterSearch();
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

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
    console.log("filter: " + this.dataSource.filteredData);
    this.dataList = this.dataSource.filteredData;
  }

  deleteListing(listId) {
    this.showLoad = true;
    this.dialogService.openConfirmationDialog({
      message: "Are you sure want to delete this data?"
    }) .subscribe(success => {
      if (success) {
        this.searchDataService.deleteFsboListing(listId).then(
          response => {
            if (response) {
              let obj = response.json();
              let result = JSON.parse(obj.d);
              if (result) {
                this.dialogService.openAlertDialog({
                  message: "Data deleted successfully.",
                  disabledClose: true
                }).subscribe(() => {
                  this.dialogService.dialog.closeAll();
                  this.getAllCustomers();
                });
              } else {
                this.dialogService.openAlertDialog({
                  message: "Failed to delete data.",
                  disabledClose: true
                }).subscribe(() => {
                  this.dialogService.dialog.closeAll();
                  this.getAllCustomers();
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
      } else {
        this.showLoad = false;
      }
    });
  }

  getAllCustomers() {
    this.showLoad = true;
    this.searchDataService.getCustomerData(this.model).then(
      response => {
        if (response) {
          let obj = response.json();
          this.dataList = JSON.parse(obj.d);
          console.log(this.dataList);
          this.dataSource = new MatTableDataSource(this.dataList);
          this.array = this.dataList;
        } else {
          this.showLoad = false;
        };
        this.dataSource.paginator = this.paginator;
        this.countTotal = this.array.length;
        if (this.position == 0)
          this.scrollTopPosition = this.position;
        this.showLoad = false;
        this.position = 0;
      }, error => {
        this.dialogService.openAlertDialog({
          message: error.statusText
        });
        this.showLoad = false;
      });
  }

  updateUser(row) {
    this.showLoad = true;
    this.searchDataService.updateCustomerData(row).then(
      response => {
        if (response) {
          let obj = response.json();
          let result = JSON.parse(obj.d);
          if (result) {
            this.dialogService.openAlertDialog({
              message: "Data updated successfully.",
              disabledClose: true
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.getAllCustomers();
            });
          } else {
            this.dialogService.openAlertDialog({
              message: "Failed to update data.",
              disabledClose: true
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.getAllCustomers();
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

  updateUserComment(row) {
    this.showLoad = true;
    this.searchDataService.updateUserComment(row).then(
      response => {
        if (response) {
          let obj = response.json();
          let result = JSON.parse(obj.d);
          if (result) {
            this.dialogService.openAlertDialog({
              message: "User comment updated.",
              disabledClose: true
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.getAllCustomers();
            });
          } else {
            this.dialogService.openAlertDialog({
              message: "User comment failed to update.",
              disabledClose: true
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.getAllCustomers();
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

  filterSearch() {
    this.dialog.open(FilterComponent, {
      data: {
        mode: 'filter',
      }
    }).afterClosed().subscribe(result => {
        if (result != null) {
          this.model = result;
          this.getAllCustomers();
        }
    });
  }

  editData(row) {
    this.dialog.open(EditDataComponent, {
      data: {
        mode: 'edit-data',
        model: row
      }
    }).afterClosed().subscribe(result => {
      if (result != null) {
        this.updateUser(result);
      }
    });
  }

  viewData(row) {
    this.searchDataService.canViewListing(row.ListingID, this.username).then(response => {
      let obj = response.json();
      let result = JSON.parse(obj.d);
      if (result) {
        this.dialog.open(ViewDataComponent, {
          data: {
            mode: 'view-data',
            model: row
          }
        }).afterClosed().subscribe(result => {
          if (result != null) {
            this.updateUserComment(result);
          }
        });
      } else {
        this.dialogService.openAlertDialog({
          message: 'You have reached your max (3) click per day! Please try again tommorow.',
          disabledClose: true
        }).subscribe(() => {
          this.dialogService.dialog.closeAll();
        });
      }
    }, error => {
      this.dialogService.openAlertDialog({
        message: "Invalid error",
        disabledClose: true
      }).subscribe(() => {
        this.dialogService.dialog.closeAll();
      });
    });
  }
}
