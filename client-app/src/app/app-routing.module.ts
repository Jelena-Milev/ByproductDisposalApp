import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByproductsComponent } from './byproducts/byproducts.component';
import { ReportsComponent } from './reports/reports.component';

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
    path: 'reports',
    component: ReportsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
