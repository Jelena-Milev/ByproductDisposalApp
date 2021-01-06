import { createAction, props } from '@ngrx/store';
import { Warehouse } from '../../model/warehouse.model';

export const loadWarehouses = createAction(
  '[Byproduct Modal Component] Load Warehouses'
);

export const loadWarehousesSuccess = createAction(
  '[Byproduct API] Load Warehouses Success',
  props<{ warehouses: Warehouse[] }>()
);
