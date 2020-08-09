import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { WarehouseService } from '../service/warehouse.service';
import { EmployeeService } from '../service/employee.service';
import { ReportService } from '../service/report.service';
import { Warehouse } from '../model/warehouse.model';
import { Employee } from '../model/employee.model';
import { Report } from '../model/report.model';
import { ReportItem } from '../model/reportItem.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  warehouses: Warehouse[] = [];
  employees: Employee[] = [];
  reportsNumbers: string[] = [];

  readonly: boolean;
  isLoaded: boolean;

  reportForm: FormGroup = new FormGroup({
    date: new FormControl(),
    utilizationRate: new FormControl({ disabled: this.isLoaded }),
    note: new FormControl({ disabled: this.isLoaded }),
    warehouse: new FormControl(),
    employee: new FormControl(),
  });

  private warehouseSub: Subscription;
  private employeeSub: Subscription;
  private reportSub: Subscription;

  selectedReport: Report;
  dataSource = new MatTableDataSource<ReportItem>();
  displayedColumns:string[] = ['id', 'byproductName', 'quantityForDisposal'];
  private paginator: MatPaginator;

  constructor(
    private warehouseService: WarehouseService,
    private employeeService: EmployeeService,
    private reportService: ReportService
  ) {}

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.readonly = true;
    this.isLoaded = false;
    this.reportSub = this.reportService
      .fetchReportsNumbers()
      .subscribe((res) => {
        this.reportsNumbers = res;
      });

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
    this.reportSub.unsubscribe();
  }

  onReportNumberSelected(number: string) {
    this.reportService.fetchByNumber(number).subscribe((res) => {
      this.selectedReport = res;
      this.dataSource.data = this.selectedReport.items;
      this.dataSource.paginator = this.paginator;
      this.reportForm.get('date').setValue(this.selectedReport.date);
      this.reportForm
        .get('utilizationRate')
        .setValue(this.selectedReport.utilizationRate);
      this.reportForm.get('note').setValue(this.selectedReport.note);
      this.reportForm
        .get('warehouse')
        .setValue(this.selectedReport.warehouse.id);
      this.reportForm.get('employee').setValue(this.selectedReport.employee.id);
      this.isLoaded = true;
    });
  }
}
