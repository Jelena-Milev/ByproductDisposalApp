import { createFeatureSelector, createSelector } from '@ngrx/store';
import {measurementUnitsFeatureKey, MeasurementUnitState} from './index';
import * as fromMeasurementUnits from './index';

export const selectMeasurementUnitState = createFeatureSelector<MeasurementUnitState>(
  measurementUnitsFeatureKey
);

export const selectMeasurementUnits = createSelector(
  selectMeasurementUnitState,
  fromMeasurementUnits.selectAll
);
