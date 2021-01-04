import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { ReportItemModalComponent } from './report-item-modal/report-item-modal.component';
import { AddReportComponent } from './add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { AddItemComponent } from './add-report/add-item/add-item.component';
import { SearchReportsComponent } from './edit-report/search-reports/search-reports.component';
import { ChangeItemsComponent } from './edit-report/change-items/change-items.component';

@NgModule({
  declarations: [
    ReportItemModalComponent,
    AddReportComponent,
    EditReportComponent,
    AddItemComponent,
    SearchReportsComponent,
    ChangeItemsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  exports: [],
})
export class ReportsModule {}
