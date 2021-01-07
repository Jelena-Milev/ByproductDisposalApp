import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Report } from '../../model/report.model';
import * as fromReports from './report.actions';

export const reportsFeatureKey = 'reports';

export interface ReportsState extends EntityState<Report> {
  reportsNumbers: number[];
  selectedReport: Report;
}

export const adapter = createEntityAdapter<Report>();

const initialState = adapter.getInitialState({
  reportsNumbers: [],
  selectedReport: undefined,
});

export const reducer = createReducer(
  initialState,
  on(fromReports.addReportSuccess, (state, action) => {
    return adapter.addOne(action.report, { ...state });
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
    const update = {
      id: action.report.id,
      changes: action.report,
    };
    return adapter.updateOne(update, { ...state });
  })
);

export const { selectAll } = adapter.getSelectors();
