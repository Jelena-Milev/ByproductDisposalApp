import { createAction, props } from '@ngrx/store';
import { MeasurementUnit } from '../../model/measurementUnit.model';

export const loadMeasurementUnits = createAction(
  '[Add Byproduct Form Component] Load Measurement Units'
);

export const loadMeasurementUnitsSuccess = createAction(
  '[Measurement Units API] Load Measurement Units Success',
  props<{ measurementUnits: MeasurementUnit[] }>()
);
