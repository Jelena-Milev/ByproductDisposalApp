import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReportComponent } from './add-report/add-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'add',
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: AddReportComponent,
  },
  {
    path: 'edit',
    component: EditReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
