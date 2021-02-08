import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'byproducts',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'byproducts',
    loadChildren: () =>
      import('./byproducts/byproducts.module').then((m) => m.ByproductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
