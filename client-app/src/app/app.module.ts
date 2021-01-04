import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReportItemModalComponent } from './reports/report-item-modal/report-item-modal.component';
import { AddReportComponent } from './reports/add-report/add-report.component';
import { EditReportComponent } from './reports/edit-report/edit-report.component';
import { AddItemComponent } from './reports/add-report/add-item/add-item.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { SearchReportsComponent } from './reports/edit-report/search-reports/search-reports.component';
import { ChangeItemsComponent } from './reports/edit-report/change-items/change-items.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {ByproductsModule} from './byproducts/byproducts.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReportItemModalComponent,
    AddReportComponent,
    EditReportComponent,
    AddItemComponent,
    ErrorDialogComponent,
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
    ByproductsModule,
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
