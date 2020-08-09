import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import {Report} from '../model/report.model';

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

  fetchByNumber(number:string){
    return this.http.get<Report>(`http://localhost:8888/byproduct-disposal/report/${number}`);
  }
}
