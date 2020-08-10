import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByproductsComponent } from './byproducts/byproducts.component';
import { AddReportComponent } from './reports/add-report/add-report.component';
import { EditReportComponent } from './reports/edit-report/edit-report.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'byproducts',
    pathMatch: 'full'
  },
  {
    path: 'byproducts',
    component: ByproductsComponent,
  },
  {
    path:'reports',
    redirectTo:'reports/add',
    pathMatch:'full'
  },
  {
    path: 'reports/add',
    component: AddReportComponent
  },
  {
    path:'reports/edit',
    component: EditReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
