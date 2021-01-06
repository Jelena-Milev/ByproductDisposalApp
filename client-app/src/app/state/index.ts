import {
  ActionReducerMap,
} from '@ngrx/store';
import * as fromMeasurementUnit from './measurementUnits/index';
import * as fromWarehouses from './warehouses/index';
import * as fromEmployees from './employees/index';

export interface AppState {
  measurementUnits: fromMeasurementUnit.MeasurementUnitState,
  warehouses: fromWarehouses.WarehouseState,
  employees: fromEmployees.EmployeesState
}

export const reducers: ActionReducerMap<AppState> = {
  measurementUnits: fromMeasurementUnit.reducer,
  warehouses: fromWarehouses.reducer,
  employees: fromEmployees.reducer
};
