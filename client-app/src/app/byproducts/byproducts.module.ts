import {NgModule} from '@angular/core';

import {ByproductsComponent} from './byproducts.component';
import {ByproductModalComponent} from './byproduct-modal/byproduct-modal.component';
import {AddByproductFormComponent} from './add-byproduct-form/add-byproduct-form.component';
import {ByproductsTableComponent} from './byproducts-table/byproducts-table.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
      ByproductsComponent,
      ByproductModalComponent,
      AddByproductFormComponent,
      ByproductsTableComponent,
    ],
    imports: [
      SharedModule
    ],
  }
)
export class ByproductsModule {

}
