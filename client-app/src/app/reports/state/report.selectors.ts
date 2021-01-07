import * as fromReport from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { reportsFeatureKey, ReportsState } from './index';

export const selectReportsState = createFeatureSelector<ReportsState>(
  reportsFeatureKey
);

export const selectReports = createSelector(
  selectReportsState,
  fromReport.selectAll
);

export const selectReportsNumbers = createSelector(
  selectReportsState,
  (state) => state.reportsNumbers
);

export const selectSelectedReport = createSelector(
  selectReportsState,
  (state) => state.selectedReport
);
