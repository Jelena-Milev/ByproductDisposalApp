import { createAction, props } from '@ngrx/store';
import { Employee } from '../../model/employee.model';

export const loadEmployees = createAction(
  '[Add Report Component] Load Employees'
);

export const loadEmployeesSuccess = createAction(
  '[Employees API] Load Employees Success',
  props<{ employees: Employee[] }>()
);
