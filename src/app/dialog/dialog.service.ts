import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AlertComponent } from './alert/alert.component';
import { ConfirmationDialogComponent } from './confirmation/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }


  openAlertDialog(options) {
    let dialogRef = this.dialog.open(AlertComponent, { panelClass: 'alertbox' });
    dialogRef.disableClose = options.disabledClose;
    dialogRef.componentInstance.message = options.message;
    dialogRef.componentInstance.content = options.content;
    dialogRef.componentInstance.buttonTxt = options.buttonTxt != null ? options.buttonTxt : 'OK';
    dialogRef.componentInstance.allowCopy = options.allowCopy == null ? false : options.allowCopy;
    return dialogRef.afterClosed();
  }

  openConfirmationDialog(options) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.message = options.message;
    return dialogRef.afterClosed();
  }

}
