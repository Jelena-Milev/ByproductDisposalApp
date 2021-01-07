import { createReducer, on } from '@ngrx/store';
import { Report } from '../../model/report.model';
import * as fromReports from './report.actions';

export const reportsFeatureKey = 'reports';

export interface ReportsState {
  reportsNumbers: number[];
  selectedReport: Report;
}

const initialState = {
  reportsNumbers: [],
  selectedReport: undefined,
};

export const reducer = createReducer(
  initialState,
  on(fromReports.addReportSuccess, (state, action) => {
    return {
      ...state,
      selectedReport: action.report,
    };
  }),
  on(fromReports.loadReportsNumbersSuccess, (state, action) => {
    return {
      ...state,
      reportsNumbers: action.numbers,
    };
  }),
  on(fromReports.getReportByIdSuccess, (state, action) => {
    return {
      ...state,
      selectedReport: action.report,
    };
  }),
  on(fromReports.editReportSuccess, (state, action) => {
    return {
      ...state,
      selectedReport: action.report,
    };
  })
);
