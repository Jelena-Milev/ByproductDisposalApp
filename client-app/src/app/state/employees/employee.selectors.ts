import { createFeatureSelector, createSelector } from '@ngrx/store';
import { employeesFeatureKey, EmployeesState } from './index';
import * as fromEmployees from './index';

export const selectEmployeesState = createFeatureSelector<EmployeesState>(
  employeesFeatureKey
);

export const selectEmployees = createSelector(
  selectEmployeesState,
  fromEmployees.selectAll
);
