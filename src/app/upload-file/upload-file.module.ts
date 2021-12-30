import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DialogModule } from '../dialog/dialog.module';
import { UploadFileService } from './upload-file.service';



@NgModule({
  imports: [
    CommonModule, FormsModule, MaterialModule, RouterModule, FlexLayoutModule, DialogModule
  ],
  declarations: [
    UploadFileComponent
  ],
  exports: [
    UploadFileComponent
  ],
  providers: [
    UploadFileService
  ],
  entryComponents: [
    UploadFileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UploadFileModule { }
