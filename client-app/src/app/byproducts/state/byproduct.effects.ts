import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ByproductService} from '../../service/byproduct.service';
import * as byproductActions from './byproduct.actions';
import {switchMap, map, tap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class ByproductEffects {

  loadByproducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(byproductActions.loadByproducts),
      switchMap(() => this.byproductsService.fetchByproducts()),
      map(byproducts => byproductActions.loadByproductsSuccess({byproducts})),
      catchError(error => of(byproductActions.loadByproductsError({error})))
    )
  );

  constructor(private actions$: Actions,
              private byproductsService: ByproductService) {
  }
}
