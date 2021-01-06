import {
  ActionReducerMap,
} from '@ngrx/store';
import * as fromMeasurementUnit from './measurementUnits/index';
import * as fromWarehouses from './warehouses/index';

export interface AppState {
  measurementUnits: fromMeasurementUnit.MeasurementUnitState,
  warehouses: fromWarehouses.WarehouseState
}

export const reducers: ActionReducerMap<AppState> = {
  measurementUnits: fromMeasurementUnit.reducer,
  warehouses: fromWarehouses.reducer
};
