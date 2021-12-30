import { Component, OnInit, Optional, Output, Inject, ViewChild, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadFileService } from './upload-file.service';
import { DialogService } from '../dialog/dialog.service';
import { startWith, filter, map } from 'rxjs/operators';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @ViewChild('fileinput', { static: false }) fileInput;
  @Output() public dragFileAccepted: EventEmitter<Object> = new EventEmitter();
  public isHovering: boolean = false;
  showLoad: boolean;
  formData: FormData = new FormData();
  sessionId: string;
  profile: string;
  username: string;
  isNewRecord: string;
  fileName: string = "Drag and drop files here, or";
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService,
    private fileUploadService: UploadFileService
  ) { }


  ngOnInit() {
    this.showLoad = false;
  }


  upload() {
    this.showLoad = true;
    if (this.fileName === "Drag and drop files here, or") {
      this.showLoad = false;

    } else {
      let message = "Are you sure proceed to upload the file?";
      this.dialogService.openConfirmationDialog({
        message: message
      })
        //.pipe(filter(success => !!success))
        .subscribe(success => {
          if (success) {
              this.proceedToUpload();
          } else {
            this.showLoad = false;
          }

        });
    }
  }

  proceedToUpload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.formData = new FormData();
      this.formData.append('uploadFile', fileBrowser.files[0]);
      this.fileUploadService.uploadFile(this.formData).subscribe(
        result => {
          console.log(result);
          if (result[0].success == "True" ) {
            this.dialogService.openAlertDialog({
              message: result[0].message,
              disabledClose: true
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.showLoad = false;
              this.router.navigateByUrl('/home/search-data');
            })
          } else {
            this.dialogService.openAlertDialog({
              message: result[0].message,
            }).subscribe(() => {
              this.dialogService.dialog.closeAll();
              this.showLoad = false
            });
          }
          /*if (result.failedData.length > 0) {
            this.excelService.exportAsExcelFile(result.failedData, "Failed Data List");
          }*/
          this.fileInput.nativeElement.value = ""
          this.fileName = "Drag and drop files here, or";
        },
        error => {
          this.dialogService.openAlertDialog({
            message: "Invalid Error"
          }).subscribe(() => {
            this.dialogService.dialog.closeAll();
            this.showLoad = false
          });
        }
      );
    }
  }

  fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    /*if(file.type !== "application/vnd.ms-excel"){
        this.dialogService.openAlertDialog({
                    message : 'Please upload .xls file'
                });
        this.fileInput.nativeElement.value = "";
         this.fileName  = "Drag and drop files here, or";
    }else {*/
    this.fileName = file.name;
    //}
  }


  onDragFileOverStart(event) {
    if (!this.isHovering) {
      this.isHovering = true;
    }
    this.preventDefaultAndStopPropagation(event);
    return false;
  };

  onDragFileOverEnd(event): any {
    this.preventDefaultAndStopPropagation(event);
    return false;
  }

  onDragFileAccepted(acceptedFile: File, e): any {
    if (this.dragFileAccepted) {
      this.fileName = acceptedFile.name;
      this.fileInput.nativeElement.files = e.dataTransfer.files;
      this.dragFileAccepted.emit({ file: acceptedFile });
    }
  }

  onDragFileDrop(event: any): any {
    this.preventDefaultAndStopPropagation(event);
    this.FileSelectHandler(event);
  }

  preventDefaultAndStopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  //file selection handler (can be called from drag, or from a file-requestor select box)
  public FileSelectHandler(e) {
    this.isHovering = false;// cancel the hover
    var files = e.target.files || e.dataTransfer.files;// fetch FileList object
    // process all File objects
    for (var i = 0, f; f = files[i]; i++) {
      if (f.type !== "application/vnd.ms-excel") {
        this.dialogService.openAlertDialog({
          message: 'Please upload .xls file'
        });
        this.fileInput.nativeElement.value = "";
        this.fileName = "Drag and drop files here, or ";
      } else {
        this.onDragFileAccepted(f, e);
      }
    }
  }

}
