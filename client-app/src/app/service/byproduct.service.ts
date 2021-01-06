import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { tap, switchMap, take } from 'rxjs/operators';

import { Byproduct } from '../model/byproduct.model';

@Injectable({
  providedIn: 'root',
})
export class ByproductService {
  private _byproducts = new BehaviorSubject<Byproduct[]>([]);

  constructor(private http: HttpClient) {}

  get byproducts() {
    return this._byproducts.asObservable();
  }

  fetchByproducts(): Observable<Byproduct[]> {
    return this.http
      .get<Byproduct[]>('http://localhost:8888/byproduct-disposal/byproduct')
      .pipe(
        tap((res) => {
          this._byproducts.next(res);
        })
      );
  }

  addByproduct(name: string, weightPerUM: number, measurementUnitId: number): Observable<Byproduct> {
    let newByproduct: Byproduct;
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
