import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Report } from '../model/report.model';

class ReportItemDto {
  constructor(public byproductId: number, public quantityForDisposal: number) {}
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private _reports = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  get reports() {
    return this._reports.asObservable();
  }

  fetchReportsNumbers() {
    return this.http
      .get<string[]>('http://localhost:8888/byproduct-disposal/report/numbers')
      .pipe(
        tap((res) => {
          this._reports.next(res);
        })
      );
  }

  fetchByNumber(number: string) {
    return this.http.get<Report>(
      `http://localhost:8888/byproduct-disposal/report/${number}`
    );
  }

  updateReport(
    id: string,
    date: Date,
    utilizationRate: number,
    note: string,
    warehouseId: number,
    employeeId: number,
    items: ReportItemDto[]
  ) {
    console.log({
      date, utilizationRate, note, warehouseId, employeeId, items
    });
    return this.http.patch<Report>(`http://localhost:8888/byproduct-disposal/report/${id}`, {
      date, utilizationRate, note, warehouseId, employeeId, items
    });
  }

  saveReport(
    date: Date,
    utilizationRate: number,
    note: string,
    warehouseId: number,
    employeeId: number,
    items: ReportItemDto[]
  ) {
    console.log({
      date, utilizationRate, note, warehouseId, employeeId, items
    });
    return this.http.post<Report>(`http://localhost:8888/byproduct-disposal/report`, {
      date, utilizationRate, note, warehouseId, employeeId, items
    });
  }
}
