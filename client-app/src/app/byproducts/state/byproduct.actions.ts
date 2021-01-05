import { createAction, props } from '@ngrx/store';
import { Byproduct } from '../../model/byproduct.model';

export const loadByproducts = createAction(
  '[Byproducts Table Component] Load Byproducts'
);

export const loadByproductsSuccess = createAction(
  '[Byproducts API] Load Byproducts Success',
  props<{ byproducts: Byproduct[] }>()
);

export const loadByproductsError = createAction(
  '[Byproducts API] Load Byproducts Error',
  props<{ error: any }>()
);
