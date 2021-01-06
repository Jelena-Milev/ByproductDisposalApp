import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Warehouse} from '../../model/warehouse.model';
import {createReducer, on} from '@ngrx/store';
import * as warehouseActions from './warehouses.actions';

export const warehouseFeatureKey = 'warehouses';

export interface WarehouseState extends EntityState<Warehouse> {}

export const adapter = createEntityAdapter<Warehouse>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(warehouseActions.loadWarehousesSuccess, (state, action) => {
    return adapter.addAll(action.warehouses, {...state});
  })
);

export const { selectAll } = adapter.getSelectors();
