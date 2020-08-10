import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { WarehouseService } from '../../service/warehouse.service';
import { EmployeeService } from '../../service/employee.service';
import { ReportService } from '../../service/report.service';
import { ByproductService } from '../../service/byproduct.service';
import { Warehouse } from '../../model/warehouse.model';
import { Employee } from '../../model/employee.model';
import { ReportItem } from '../../model/reportItem.model';
import { Byproduct } from '../../model/byproduct.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

class ReportItemDto {
  constructor(public byproductId: number, public quantityForDisposal: number) {}
}

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent implements OnInit, OnDestroy, AfterViewInit {
  reportForm: FormGroup = new FormGroup({
    date: new FormControl(Validators.required),
    utilizationRate: new FormControl([
      Validators.required,
      Validators.min(0.001),
    ]),
    note: new FormControl(),
    warehouse: new FormControl(Validators.required),
    employee: new FormControl(Validators.required),
  });

  itemForm: FormGroup = new FormGroup({
    byproduct: new FormControl(null, Validators.required),
    quantity: new FormControl('', [Validators.required, Validators.min(0.001)]),
  });

  warehouses: Warehouse[] = [];
  employees: Employee[] = [];
  byproducts: Byproduct[] = [];

  private warehouseSub: Subscription;
  private employeeSub: Subscription;
  private byproductsSub: Subscription;

  items: ReportItem[] = [];

  dataSource = new MatTableDataSource<ReportItem>();
  displayedColumns: string[] = [
    'id',
    'byproductName',
    'measurementUnit',
    'quantityForDisposal',
    'delete',
  ];
  private paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private warehouseService: WarehouseService,
    private employeeService: EmployeeService,
    private byproductService: ByproductService,
    private reportService: ReportService
  ) {}

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
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

    this.byproductsSub = this.byproductService
      .fetchByproducts()
      .subscribe((res) => {
        this.byproducts = res;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.items;
    this.dataSource.paginator = this.paginator;
    this.employeeService.fetchEmployees().subscribe();
    this.warehouseService.fetchWarehouses().subscribe();
  }

  ngOnDestroy(): void {
    this.warehouseSub.unsubscribe();
    this.employeeSub.unsubscribe();
    this.byproductsSub.unsubscribe();
  }

  onAddItem() {
    console.log(this.itemForm);
    const byproduct = this.itemForm.get('byproduct').value;
    const quantityForDisposal = this.itemForm.get('quantity').value;
    const itemIndex: number = this.items.findIndex(
      (item) => item.byproduct.name === byproduct.name
    );
    if (itemIndex === -1) {
      const newItem: ReportItem = new ReportItem(
        byproduct,
        quantityForDisposal
      );
      this.items.push(newItem);
    } else {
      this.items[itemIndex].quantityForDisposal += quantityForDisposal;
    }
    this.dataSource.data = this.items;
  }

  onDeleteItem(element: ReportItem) {
    const itemIndex = this.items.findIndex(
      (item) => item.byproduct.name === element.byproduct.name
    );
    this.items.splice(itemIndex, 1);
    this.dataSource.data = this.items;
  }

  onSaveReport() {
    const date: Date = this.reportForm.get('date').value;
    const utilizationRate: number = this.reportForm.get('utilizationRate')
      .value;
    const note: string = this.reportForm.get('note').value;
    const warehouseId: number = this.reportForm.get('warehouse').value;
    const employeeId: number = this.reportForm.get('employee').value;
    const items: ReportItemDto[] = [];
    this.items.forEach((item) => {
      const itemDto = new ReportItemDto(
        item.byproduct.id,
        item.quantityForDisposal
      );
      items.push(itemDto);
    });
    this.reportService
      .saveReport(date, utilizationRate, note, warehouseId, employeeId, items)
      .subscribe((report) => {
        this.reportForm.get('date').setValue(report.date);
        this.reportForm.get('utilizationRate').setValue(report.utilizationRate);
        this.reportForm.get('note').setValue(report.note);
        this.reportForm.get('warehouse').setValue(report.warehouse.id);
        this.reportForm.get('employee').setValue(report.employee.id);
        this.dataSource.data = report.items;
        this.snackBar.open('Uspešno sačuvan izveštaj', '', {
          duration: 2000,
        });
        this.reportForm.reset();
        this.reportForm.markAsPristine();
        this.reportForm.markAsUntouched();
      });
  }
}
