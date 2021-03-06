import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  fetchEmployees(){
    return this.http.get<Employee[]>('http://localhost:8888/byproduct-disposal/employee');
  }
}
