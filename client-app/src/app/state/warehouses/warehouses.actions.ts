import { createAction, props } from '@ngrx/store';
import { Warehouse } from '../../model/warehouse.model';

export const loadWarehouses_BpModal = createAction(
  '[Byproduct Modal Component] Load Warehouses'
);

export const loadWarehouses_AddReport = createAction(
  '[Add Report Component] Load Warehouses'
);

export const loadWarehousesSuccess = createAction(
  '[Warehouse API] Load Warehouses Success',
  props<{ warehouses: Warehouse[] }>()
);
