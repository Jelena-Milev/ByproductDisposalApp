import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {WarehouseService} from '../../service/warehouse.service';
import * as warehousesActions from './warehouses.actions';
import {switchMap, map} from 'rxjs/operators';

@Injectable()
export class WarehousesEffects{

  loadWarehouses$ = createEffect(() => this.actions$.pipe(
    ofType(warehousesActions.loadWarehouses_BpModal, warehousesActions.loadWarehouses_AddReport,
           warehousesActions.loadWarehouses_EditReport),
    switchMap(() => this.warehousesService.fetchWarehouses()),
    map(warehouses => warehousesActions.loadWarehousesSuccess({warehouses}))
  ));

  constructor(private actions$: Actions,
              private warehousesService: WarehouseService) {
  }
}
