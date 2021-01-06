import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../../service/employee.service';
import * as employeesActions from './employee.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class EmployeeEffects {

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployees),
      switchMap(() => this.employeesService.fetchEmployees()),
      map((employees) => employeesActions.loadEmployeesSuccess({ employees }))
    )
  );

  constructor(
    private actions$: Actions,
    private employeesService: EmployeeService
  ) {}
}
