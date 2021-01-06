import { createAction, props } from '@ngrx/store';
import { Report } from '../../model/report.model';
import { ReportItemDto } from '../../service/report.service';

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
