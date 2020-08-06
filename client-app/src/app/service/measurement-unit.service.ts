import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MeasurementUnit } from '../model/measurementUnit.model';

@Injectable({
  providedIn: 'root',
})
export class MeasurementUnitService {
  private _measurementUnits = new BehaviorSubject<MeasurementUnit[]>([]);

  getMeasurementUnits(): Observable<MeasurementUnit[]> {
    return this._measurementUnits.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchMeasurementUnits(){
    return this.http
      .get<MeasurementUnit[]>(
        'http://localhost:8888/byproduct-disposal/measurement-unit'
      )
      .pipe(
        tap(res=>{
          this._measurementUnits.next(res);
          console.log(this._measurementUnits);
        })
      );
  }
}
