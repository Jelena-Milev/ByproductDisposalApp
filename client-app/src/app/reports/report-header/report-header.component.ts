import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { Warehouse } from 'src/app/model/warehouse.model';
import { Employee } from 'src/app/model/employee.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { Report } from 'src/app/model/report.model';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.css'],
})
export class ReportHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  reportForm: FormGroup = new FormGroup({
    date: new FormControl(),
    utilizationRate: new FormControl(),
    note: new FormControl(),
    warehouse: new FormControl(),
    employee: new FormControl(),
  });

  warehouses: Warehouse[] = [];
  employees: Employee[] = [];

  @Input() isLoaded: boolean;
  @Input() readonly: boolean;
  @Input() report: Report;

  private warehouseSub: Subscription;
  private employeeSub: Subscription;

  constructor(
    private warehouseService: WarehouseService,
    private employeeService: EmployeeService
  ) {}

  ngAfterViewInit(): void {
    this.employeeService.fetchEmployees().subscribe();
    this.warehouseService.fetchWarehouses().subscribe();
  }

  ngOnInit(): void {
    this.warehouseSub = this.warehouseService
      .fetchWarehouses()
      .subscribe((res) => {
        this.warehouses = res;
      });

    this.employeeSub = this.employeeService
      .fetchEmployees()
      .subscribe((res) => {
        this.employees = res;
      });
  }

  ngOnDestroy(): void {
    this.warehouseSub.unsubscribe();
    this.employeeSub.unsubscribe();
  }
}
