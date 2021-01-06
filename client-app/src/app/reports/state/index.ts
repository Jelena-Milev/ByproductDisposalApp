import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Report } from '../../model/report.model';
import * as fromReports from './report.actions';

export const reportsFeatureKey = 'reports';

export interface ReportsState extends EntityState<Report> {}

export const adapter = createEntityAdapter<Report>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(fromReports.addReportSuccess, (state, action) => {
    return adapter.addOne(action.report, { ...state });
  })
);

export const { selectAll } = adapter.getSelectors();
