import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  public message: string;
  public content: string[];
  public buttonTxt: string;
  public allowCopy: boolean = false;
  public copied: boolean = false;

  constructor(
    @Optional() private dialogRef: MatDialogRef<AlertComponent>
  ) { }

  ngOnInit() { }

  ok() {
    this.dialogRef.close(true);
  }

  copy() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.message;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copied = true;
  }

}
