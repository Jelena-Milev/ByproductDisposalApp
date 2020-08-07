import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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

  fetchByproducts() {
    return this.http
      .get<Byproduct[]>('http://localhost:8888/byproduct-disposal/byproduct')
      .pipe(
        tap((res) => {
          this._byproducts.next(res);
        })
      );
  }

  addByproduct(name: string, weightPerUM: number, measurementUnitId: number) {
    let newByproduct: Byproduct;
    return this.http
      .post<Byproduct>('http://localhost:8888/byproduct-disposal/byproduct', {
        name,
        weightPerUM,
        measurementUnitId,
      })
      .pipe(
        switchMap((savedByroduct) => {
          newByproduct = savedByroduct;
          return this.byproducts;
        }),
        take(1),
        tap((res) => {
          this._byproducts.next(res.concat(newByproduct));
        })
      );
  }

  editByproduct(
    id: number,
    name: string,
    quantity: number,
    weightPerUM: number,
    warehouseId: number,
    measurementUnitId: number
  ) {
    let newByproduct: Byproduct;
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
      )
      .pipe(
        switchMap((res) => {
          newByproduct = res;
          return this.byproducts;
        }),
        take(1),
        tap((byproducts) => {
          const alteredByproductIndex = byproducts.findIndex(
            (b) => b.id === id
          );
          const alteredByproducts = [...byproducts];
          alteredByproducts[alteredByproductIndex] = newByproduct;
          this._byproducts.next(alteredByproducts);
        })
      );
  }

  deleteByproduct(id: number) {
    return this.http
      .delete(`http://localhost:8888/byproduct-disposal/byproduct/${id}`)
      .pipe(
        switchMap(() => {
          return this.byproducts;
        }),
        take(1),
        tap((res) => {
          const byproducts = res.filter((b) => b.id !== id);
          this._byproducts.next(byproducts);
        })
      );
  }
}
