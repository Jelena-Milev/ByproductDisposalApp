import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ByproductsComponent } from './byproducts/byproducts.component';
import { HeaderComponent } from './header/header.component';
import { ByproductModalComponent } from './byproducts/byproduct-modal/byproduct-modal.component';
import { ReportItemModalComponent } from './reports/report-item-modal/report-item-modal.component';
import { AddReportComponent } from './reports/add-report/add-report.component';
import { EditReportComponent } from './reports/edit-report/edit-report.component';
import { ReportHeaderComponent } from './reports/report-header/report-header.component';
import { AddItemComponent } from './reports/add-item/add-item.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AddByproductFormComponent } from './byproducts/add-byproduct-form/add-byproduct-form.component';
import { ByproductsTableComponent } from './byproducts/byproducts-table/byproducts-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ByproductsComponent,
    HeaderComponent,
    ByproductModalComponent,
    ReportItemModalComponent,
    AddReportComponent,
    EditReportComponent,
    ReportHeaderComponent,
    AddItemComponent,
    ErrorDialogComponent,
    AddByproductFormComponent,
    ByproductsTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
