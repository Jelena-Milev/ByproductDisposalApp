import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { MeasurementUnitService } from '../../service/measurement-unit.service';
import * as measurementUnitActions from './measurement-unit.actions';
import {switchMap, map} from 'rxjs/operators';

@Injectable()
export class MeasurementUnitEffects {

  loadMeasurementUnits$ = createEffect(() => this.actions$.pipe(
    ofType(measurementUnitActions.loadMeasurementUnits_AddBpComp,
           measurementUnitActions.loadMeasurementUnits_BpModal),
    switchMap(() => this.measurementUnitsService.fetchMeasurementUnits()),
    map(res => measurementUnitActions.loadMeasurementUnitsSuccess({measurementUnits: res}))
  ));

  constructor(
    private actions$: Actions,
    private measurementUnitsService: MeasurementUnitService
  ) {}
}
