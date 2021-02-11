import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ByproductService } from '../../service/byproduct.service';
import * as byproductActions from './byproduct.actions';
import { switchMap, map, tap, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ByproductEffects {
  loadByproducts$ = createEffect(() => this.actions$.pipe(
      ofType(byproductActions.loadByproducts_BpTable, byproductActions.loadByproducts_AddReportItem),
      switchMap(() => this.byproductsService.fetchByproducts().pipe(
        map((byproducts) =>
          byproductActions.loadByproductsSuccess({ byproducts })
        ),
        catchError((error) => of(byproductActions.loadByproductsError({ error })))
      ))
    )
  );

  addByproducts$ = createEffect(() => this.actions$.pipe(
      ofType(byproductActions.addByproduct),
      concatMap((action) =>
        this.byproductsService.addByproduct(
          action.name,
          action.weightPerUM,
          action.measurementUnitId
        ).pipe(
          map((savedByproduct) =>
            byproductActions.addByproductSuccess({ savedByproduct })
          ),
          catchError((error) => of(byproductActions.addByproductError({ error })))
        )
      )
    )
  );

  addByproductError$ = createEffect(() => this.actions$.pipe(
        ofType(byproductActions.addByproductError),
        tap((action) => {
          this.dialog.open(ErrorDialogComponent, {
            width: '40%',
            data: action.error.error.message,
          });
        })
      ),
    { dispatch: false }
  );

  deleteByproduct$ = createEffect(() => {
    let byproductId: number | string;
    return this.actions$.pipe(
      ofType(byproductActions.deleteByproduct),
      concatMap((action) => {
        byproductId = action.byproductId;
        return this.byproductsService.deleteByproduct(action.byproductId).pipe(
          map(() => byproductActions.deleteByproductSuccess({ byproductId })),
          catchError((error) =>
            of(byproductActions.deleteByproductError({ error }))
          )
        )
      })
    );
  });

  deleteByproductError$ = createEffect(() => this.actions$.pipe(
        ofType(byproductActions.deleteByproductError),
        tap((action) => {
          this.dialog.open(ErrorDialogComponent, {
            width: '40%',
            data: 'Ne moze se obrisati nusproizvod koji je deo izvestaja',
          });
        })
      ),
    { dispatch: false }
  );

  editByproduct$ = createEffect(() => this.actions$.pipe(
    ofType(byproductActions.editByproduct),
    concatMap(action => this.byproductsService.
    editByproduct(action.id, action.name, action.quantity, action.weightPerUM, action.warehouseId, action.measurementUnitId)
      .pipe(
        map(byproduct => byproductActions.editByproductSuccess({byproduct})),
        catchError((error) => of(byproductActions.editByproductError({ error }))
      )
    )
  )));

  editByproductError$ = createEffect(() => this.actions$.pipe(
    ofType(byproductActions.editByproductError),
    tap(action => {
      this.dialog.open(ErrorDialogComponent, {
        width: '40%',
        data: action.error.error.message,
      });
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private byproductsService: ByproductService,
    private dialog: MatDialog
  ) {}
}
