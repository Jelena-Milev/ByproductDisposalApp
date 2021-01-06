import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { MeasurementUnit } from '../../model/measurementUnit.model';
import { createReducer, on } from '@ngrx/store';
import * as measurementUnitActions from './measurement-unit.actions';

export const measurementUnitsFeatureKey = 'measurementUnits';

export interface MeasurementUnitState extends EntityState<MeasurementUnit> {}

export const adapter = createEntityAdapter<MeasurementUnit>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(measurementUnitActions.loadMeasurementUnitsSuccess, (state, action) => {
    return adapter.addAll(action.measurementUnits, { ...state });
  })
);

export const { selectAll } = adapter.getSelectors();
