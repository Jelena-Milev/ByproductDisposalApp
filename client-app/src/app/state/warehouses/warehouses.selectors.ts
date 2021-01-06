import { createFeatureSelector, createSelector } from '@ngrx/store';
import { warehouseFeatureKey, WarehouseState } from './index';
import * as fromWarehouse from './index';

export const selectWarehousesState = createFeatureSelector<WarehouseState>(
  warehouseFeatureKey
);

export const selectWarehouses = createSelector(
  selectWarehousesState,
  fromWarehouse.selectAll
);
