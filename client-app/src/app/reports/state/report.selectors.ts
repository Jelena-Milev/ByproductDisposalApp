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
