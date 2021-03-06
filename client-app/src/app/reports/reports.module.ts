import { NgModule } from '@angular/core';

import { ReportItemModalComponent } from './report-item-modal/report-item-modal.component';
import { AddReportComponent } from './add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { AddItemComponent } from './add-report/add-item/add-item.component';
import { SearchReportsComponent } from './edit-report/search-reports/search-reports.component';
import { ChangeItemsComponent } from './edit-report/change-items/change-items.component';
import {SharedModule} from '../shared/shared.module';
import {ReportsRoutingModule} from './reports-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromReports from './state';
import {EffectsModule} from '@ngrx/effects';
import {ReportEffect} from './state/report.effect';

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
    SharedModule,
    ReportsRoutingModule,
    StoreModule.forFeature(fromReports.reportsFeatureKey, fromReports.reducer),
    EffectsModule.forFeature([ReportEffect])
  ],
  exports: [],
})
export class ReportsModule {}
