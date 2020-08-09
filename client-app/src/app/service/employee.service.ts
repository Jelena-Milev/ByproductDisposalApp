import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _employees = new BehaviorSubject<Employee[]>([]);

  constructor(private http: HttpClient) {}

  get employees(){
    return this._employees.asObservable();
  }

  fetchEmployees(){
    return this.http.get<Employee[]>('http://localhost:8888/byproduct-disposal/employee').pipe(
      tap(res=>{
        this._employees.next(res);
      })
    )
  }
}
