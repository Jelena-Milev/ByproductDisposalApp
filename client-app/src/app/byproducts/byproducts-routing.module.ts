import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByproductsComponent } from './byproducts.component';

const routes: Routes = [
  {
    path: '',
    component: ByproductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ByproductRoutingModule {}
