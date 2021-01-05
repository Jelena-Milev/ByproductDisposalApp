import {NgModule} from '@angular/core';

import {ByproductsComponent} from './byproducts.component';
import {ByproductModalComponent} from './byproduct-modal/byproduct-modal.component';
import {AddByproductFormComponent} from './add-byproduct-form/add-byproduct-form.component';
import {ByproductsTableComponent} from './byproducts-table/byproducts-table.component';
import {SharedModule} from '../shared/shared.module';
import {ByproductRoutingModule} from './byproducts-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromByproducts from './state';
import {EffectsModule} from '@ngrx/effects';
import {ByproductEffects} from './state/byproduct.effects';
import {byproductsReducer} from './state';

@NgModule({
    declarations: [
      ByproductsComponent,
      ByproductModalComponent,
      AddByproductFormComponent,
      ByproductsTableComponent,
    ],
    imports: [
      SharedModule,
      ByproductRoutingModule,
      StoreModule.forFeature(fromByproducts.byproductsFeatureKey, [byproductsReducer]),
      EffectsModule.forFeature([ByproductEffects])
    ],
  }
)
export class ByproductsModule {

}
