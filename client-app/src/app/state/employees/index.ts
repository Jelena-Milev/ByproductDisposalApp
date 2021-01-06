import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Employee } from '../../model/employee.model';
import { createReducer, on } from '@ngrx/store';
import * as employeeActions from './employee.actions';

export const employeesFeatureKey = 'employees';

export interface EmployeesState extends EntityState<Employee> {}

const adapter = createEntityAdapter<Employee>();

const initialState = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(employeeActions.loadEmployeesSuccess, (state, action) => {
    return adapter.addAll(action.employees, { ...state });
  })
);

export const { selectAll } = adapter.getSelectors();
