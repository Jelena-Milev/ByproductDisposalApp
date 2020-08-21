import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { WarehouseService } from '../../service/warehouse.service';
import { EmployeeService } from '../../service/employee.service';
import { ReportService } from '../../service/report.service';
import { Warehouse } from '../../model/warehouse.model';
import { Employee } from '../../model/employee.model';
import { ReportItem } from '../../model/reportItem.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    utilizationRate: new FormControl('', [
      Validators.required,
      Validators.min(0.001),
      Validators.max(100)
    ]),
    note: new FormControl(),
    warehouse: new FormControl(null, Validators.required),
    employee: new FormControl(null, Validators.required),
  });

  warehouses: Warehouse[] = [];
  employees: Employee[] = [];

  private warehouseSub: Subscription;
  private employeeSub: Subscription;

  items: ReportItem[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private warehouseService: WarehouseService,
    private employeeService: EmployeeService,
    private reportService: ReportService
  ) {}

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

  ngAfterViewInit(): void {
    this.employeeService.fetchEmployees().subscribe();
    this.warehouseService.fetchWarehouses().subscribe();
  }

  ngOnDestroy(): void {
    this.warehouseSub.unsubscribe();
    this.employeeSub.unsubscribe();
  }

  itemsChanged(items: ReportItem[]){
    this.items = items;
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
        this.snackBar.open('Uspešno sačuvan izveštaj', '', {
          duration: 2000,
        });
        this.reportForm.reset();
        this.reportForm.markAsPristine();
        this.reportForm.markAsUntouched();
      },
      (error) => {
        this.dialog.open(ErrorDialogComponent, {
          width: '40%',
          data: error.error.message,
        });
        console.log(error);
      });
  }
}
