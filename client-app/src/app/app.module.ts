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
import { AddItemComponent } from './reports/add-report/add-item/add-item.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AddByproductFormComponent } from './byproducts/add-byproduct-form/add-byproduct-form.component';
import { ByproductsTableComponent } from './byproducts/byproducts-table/byproducts-table.component';
import { SearchReportsComponent } from './reports/edit-report/search-reports/search-reports.component';
import { ChangeItemsComponent } from './reports/edit-report/change-items/change-items.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ByproductsComponent,
    HeaderComponent,
    ByproductModalComponent,
    ReportItemModalComponent,
    AddReportComponent,
    EditReportComponent,
    AddItemComponent,
    ErrorDialogComponent,
    AddByproductFormComponent,
    ByproductsTableComponent,
    SearchReportsComponent,
    ChangeItemsComponent,
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
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
