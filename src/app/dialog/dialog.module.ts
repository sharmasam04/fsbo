import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DialogService } from './dialog.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { AlertComponent } from './alert/alert.component';
import { ConfirmationDialogComponent } from './confirmation/confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule, FlexLayoutModule, MaterialModule, FormsModule
  ],
  declarations: [
    AlertComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    AlertComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    DialogService
  ]
})
export class DialogModule { }
