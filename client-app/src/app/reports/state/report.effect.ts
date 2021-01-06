import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReportService } from '../../service/report.service';
import * as reportActions from './report.actions';
import {catchError, concatMap, map, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {of} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ReportEffect {
  addReport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reportActions.addReport),
      concatMap((action) =>
        this.reportsService.saveReport(
          action.date,
          action.utilizationRate,
          action.note,
          action.warehouseId,
          action.employeeId,
          action.items
        )
      ),
      map((report) => reportActions.addReportSuccess({ report })),
      catchError(error => of(reportActions.addReportError({ error })))
    )
  );

  addReportSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(reportActions.addReportSuccess),
      tap((action) => {
        this.snackBar.open('Uspešno sačuvan izveštaj broj '+ action.report.id, '', {
          duration: 2000,
        });
      })),
    { dispatch: false }
  );

  addReportError$ = createEffect(
    () => this.actions$.pipe(ofType(reportActions.addReportError),
      tap((action) => {
        this.dialog.open(ErrorDialogComponent, {
          width: '40%',
          data: action.error.error.message,
        });
      })),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private reportsService: ReportService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}
}
