import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

import { Report } from '../model/report.model';

export class ReportItemDto {
  constructor(public byproductId: number, public quantityForDisposal: number) {}
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  constructor(private http: HttpClient) {}

  fetchReportsNumbers() {
    return this.http
      .get<number[]>('http://localhost:8888/byproduct-disposal/report/numbers')
      .pipe(
        map((numbers) => {
          return numbers.sort((a: number, b: number) => {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          });
        })
      );
  }

  fetchByNumber(number: string | number) {
    return this.http.get<Report>(
      `http://localhost:8888/byproduct-disposal/report/${number}`
    );
  }

  updateReport(
    id: number,
    date: Date,
    utilizationRate: number,
    note: string,
    warehouseId: number,
    employeeId: number,
    items: ReportItemDto[]
  ) {
    console.log('ReportService: update report');
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
    return this.http.post<Report>(`http://localhost:8888/byproduct-disposal/report`, {
      date, utilizationRate, note, warehouseId, employeeId, items
    });
  }
}
