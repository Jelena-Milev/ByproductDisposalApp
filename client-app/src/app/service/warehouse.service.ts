import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Warehouse } from '../model/warehouse.model';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private _warehouses = new BehaviorSubject<Warehouse[]>([]);

  constructor(private http: HttpClient) {}

  get warehouses(): Observable<Warehouse[]> {
    return this._warehouses.asObservable();
  }

  fetchWarehouses() {
    return this.http
      .get<Warehouse[]>('http://localhost:8888/byproduct-disposal/warehouse')
      .pipe(
        tap((res) => {
          this._warehouses.next(res);
        })
      );
  }

  fetchById(id: number) {
    return this.http.get<Warehouse>(`http://localhost:8888/byproduct-disposal/warehouse/${id}`);
  }
}
