import { createAction, props } from '@ngrx/store';
import { Report } from '../../model/report.model';
import { ReportItemDto } from '../../service/report.service';

export const loadReportsNumbers = createAction(
  '[Search Reports Component] Load Reports Numbers'
);

export const loadReportsNumbersSuccess = createAction(
  '[Reports API] Load Reports Numbers Success',
  props<{ numbers: number[] }>()
);

export const getReportById = createAction(
  '[Search Reports Component] Get Report By Id',
  props<{ id: number }>()
);

export const getReportByIdSuccess = createAction(
  '[Reports API] Get Report By Id Success',
  props<{ report: Report }>()
);

export const addReport = createAction(
  '[Add Report Component] Add Report',
  props<{
    date: Date;
    utilizationRate: number;
    note: string;
    warehouseId: number;
    employeeId: number;
    items: ReportItemDto[];
  }>()
);

export const addReportSuccess = createAction(
  '[Reports API] Add Report Success',
  props<{ report: Report }>()
);

export const addReportError = createAction(
  '[Reports API] Add Report Error',
  props<{ error: any }>()
);

export const editReport = createAction(
  '[Edit Report Component] Edit Report',
  props<{
    id: number,
    date: Date;
    utilizationRate: number;
    note: string;
    warehouseId: number;
    employeeId: number;
    items: ReportItemDto[];
  }>()
);

export const editReportSuccess = createAction(
  '[Reports API] Edit Report Success',
  props<{ report: Report }>()
);

export const editReportError = createAction(
  '[Reports API] Edit Report Error',
  props<{ error: any }>()
);
