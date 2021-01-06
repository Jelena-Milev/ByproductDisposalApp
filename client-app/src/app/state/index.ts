import {
  ActionReducerMap,
} from '@ngrx/store';
import * as fromMeasurementUnit from './measurementUnits/index';

export interface AppState {
  measurementUnits: fromMeasurementUnit.MeasurementUnitState
}

export const reducers: ActionReducerMap<AppState> = {
  measurementUnits: fromMeasurementUnit.reducer
};
