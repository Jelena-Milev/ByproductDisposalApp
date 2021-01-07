import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap, switchMap, take } from 'rxjs/operators';

import { Byproduct } from '../model/byproduct.model';

@Injectable({
  providedIn: 'root',
})
export class ByproductService {

  constructor(private http: HttpClient) {}

  fetchByproducts(): Observable<Byproduct[]> {
    return this.http
      .get<Byproduct[]>('http://localhost:8888/byproduct-disposal/byproduct');
  }

  addByproduct(name: string, weightPerUM: number, measurementUnitId: number): Observable<Byproduct> {
    return this.http
      .post<Byproduct>('http://localhost:8888/byproduct-disposal/byproduct', {
        name,
        weightPerUM,
        measurementUnitId,
      });
  }

  editByproduct(
    id: number,
    name: string,
    quantity: number,
    weightPerUM: number,
    warehouseId: number,
    measurementUnitId: number
  ) {
    return this.http
      .patch<Byproduct>(
        `http://localhost:8888/byproduct-disposal/byproduct/${id}`,
        {
          name,
          quantity,
          weightPerUM,
          warehouseId,
          measurementUnitId,
        }
      );
  }

  deleteByproduct(id: number | string): Observable<Object> {
    return this.http
      .delete(`http://localhost:8888/byproduct-disposal/byproduct/${id}`);
  }
}
