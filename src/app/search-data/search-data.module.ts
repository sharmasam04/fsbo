import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SearchDataComponent } from '../search-data/search-data.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { SearchDataService } from '../search-data/search-data.service';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, MaterialModule, FlexLayoutModule, ReactiveFormsModule
  ],
  declarations: [
    SearchDataComponent, EditDataComponent, FilterComponent, ViewDataComponent
  ],
  exports: [
    SearchDataComponent, EditDataComponent, FilterComponent, ViewDataComponent
  ],
  providers: [
    SearchDataService
  ],
  entryComponents: [
    SearchDataComponent, EditDataComponent, FilterComponent, ViewDataComponent
  ]
})
export class SearchDataModule { }
