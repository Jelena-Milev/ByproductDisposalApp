import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ByproductService } from '../../service/byproduct.service';
import * as byproductActions from './byproduct.actions';
import {switchMap, map, tap, catchError, concatMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import * as AddByproductComponent from '../add-byproduct-form/add-byproduct-form.component';

@Injectable()
export class ByproductEffects {
  loadByproducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(byproductActions.loadByproducts),
      switchMap(() => this.byproductsService.fetchByproducts()),
      map((byproducts) =>
        byproductActions.loadByproductsSuccess({ byproducts })
      ),
      catchError((error) => of(byproductActions.loadByproductsError({ error })))
    )
  );

  addByproducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(byproductActions.addByproduct),
      concatMap((action) =>
        this.byproductsService.addByproduct(
          action.name,
          action.weightPerUM,
          action.measurementUnitId
        )
      ),
      map((savedByproduct) =>
        byproductActions.addByproductSuccess({ savedByproduct })
      ),
      catchError((error) => of(byproductActions.addByproductError({ error })))
    )
  );

  addByproductError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(byproductActions.addByproductError),
        tap((action) => {
          this.dialog.open(ErrorDialogComponent, {
            width: '40%',
            data: action.error.error.message,
          });
        })
      ),{ dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private byproductsService: ByproductService,
    private dialog: MatDialog
  ) {}
}
