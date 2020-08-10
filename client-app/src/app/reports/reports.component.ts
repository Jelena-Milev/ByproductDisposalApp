import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { WarehouseService } from '../service/warehouse.service';
import { EmployeeService } from '../service/employee.service';
import { ReportService } from '../service/report.service';
import { ByproductService } from '../service/byproduct.service';
import { Warehouse } from '../model/warehouse.model';
import { Employee } from '../model/employee.model';
import { Report } from '../model/report.model';
import { ReportItem } from '../model/reportItem.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Byproduct } from '../model/byproduct.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  warehouses: Warehouse[] = [];
  employees: Employee[] = [];
  reportsNumbers: string[] = [];
  byproducts: Byproduct[] = [];

  readonly: boolean;
  isLoaded: boolean;

  reportForm: FormGroup = new FormGroup({
    date: new FormControl(),
    utilizationRate: new FormControl(),
    note: new FormControl(),
    warehouse: new FormControl(),
    employee: new FormControl(),
  });

  itemForm: FormGroup = new FormGroup({
    byproduct: new FormControl(),
    quantityForDisposal: new FormControl(),
  });

  private warehouseSub: Subscription;
  private employeeSub: Subscription;
  private reportSub: Subscription;

  selectedReport: Report;
  dataSource = new MatTableDataSource<ReportItem>();
  displayedColumns: string[] = [
    'id',
    'byproductName',
    'measurementUnit',
    'quantityForDisposal',
    'edit',
    'delete',
  ];
  private paginator: MatPaginator;

  constructor(
    private warehouseService: WarehouseService,
    private employeeService: EmployeeService,
    private reportService: ReportService,
    private byproductService: ByproductService
  ) {}

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
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
    this.readonly = true;
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

  onChangeReport() {
    this.readonly = false;
    this.byproductService.fetchByproducts().subscribe((res) => {
      this.byproducts = res;
    });
  }

  onAddItem() {
    const byproduct = this.itemForm.get('byproduct').value;
    const quantityForDisposal = this.itemForm.get('quantityForDisposal').value;
    const itemIndex: number = this.selectedReport.items.findIndex(
      (item) => item.byproduct.name === byproduct.name
    );
    if (itemIndex === -1) {
      const newItem: ReportItem = new ReportItem(
        byproduct,
        quantityForDisposal
      );
      this.selectedReport.items.push(newItem);
    } else {
      this.selectedReport.items[
        itemIndex
      ].quantityForDisposal += quantityForDisposal;
    }
    this.dataSource.data = this.selectedReport.items;
  }

  onDeleteItem(element: ReportItem) {
    const itemIndex = this.selectedReport.items.findIndex(
      (item) => item.byproduct.name === element.byproduct.name
    );
    this.selectedReport.items.splice(itemIndex, 1);
    this.dataSource.data = this.selectedReport.items;
  }
}
