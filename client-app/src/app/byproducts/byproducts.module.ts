import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../material.module';

import {ByproductsComponent} from './byproducts.component';
import {ByproductModalComponent} from './byproduct-modal/byproduct-modal.component';
import {AddByproductFormComponent} from './add-byproduct-form/add-byproduct-form.component';
import {ByproductsTableComponent} from './byproducts-table/byproducts-table.component';

@NgModule({
    declarations: [
      ByproductsComponent,
      ByproductModalComponent,
      AddByproductFormComponent,
      ByproductsTableComponent,
    ],
    imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      HttpClientModule,
    ],
  }
)
export class ByproductsModule {

}
