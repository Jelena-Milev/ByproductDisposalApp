import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Warehouse } from '../model/warehouse.model';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {

  constructor(private http: HttpClient) {}

  fetchWarehouses() {
    return this.http
      .get<Warehouse[]>('http://localhost:8888/byproduct-disposal/warehouse');
  }

  fetchById(id: number) {
    return this.http.get<Warehouse>(`http://localhost:8888/byproduct-disposal/warehouse/${id}`);
  }
}
