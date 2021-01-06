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

export const addByproduct = createAction(
  '[Add Byproduct Form Component] Add Byproduct',
  props<{ name: string; weightPerUM: number; measurementUnitId: number }>()
);

export const addByproductSuccess = createAction(
  '[Byproduct API] Add Byproduct Success',
  props<{ savedByproduct: Byproduct }>()
);

export const addByproductError = createAction(
  '[Byproduct API] Add Byproduct Error',
  props<{ error: any }>()
);

export const deleteByproduct = createAction(
  '[Byproducts Table Component] Delete Byproduct',
  props<{ byproductId: number | string }>()
);

export const deleteByproductSuccess = createAction(
  '[Byproducts API] Delete Byproduct Success',
  props<{ byproductId: number | string }>()
);

export const deleteByproductError = createAction(
  '[Byproducts API] Delete Byproduct Error',
  props<{ error: any }>()
);

export const editByproduct = createAction(
  '[Byproduct Modal Component] Edit Byproduct',
  props<{
    id: number;
    name: string;
    quantity: number;
    weightPerUM: number;
    warehouseId: number;
    measurementUnitId: number;
  }>()
);

export const editByproductSuccess = createAction(
  '[Byproduct API] Edit Byproduct Success',
  props<{ byproduct: Byproduct }>()
);

export const editByproductError = createAction(
  '[Byproduct API] Edit Byproduct Error',
  props<{ error: any }>()
);
