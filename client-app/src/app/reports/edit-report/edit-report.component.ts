import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { WarehouseService } from '../../service/warehouse.service';
import { EmployeeService } from '../../service/employee.service';
import { ReportService } from '../../service/report.service';
import { Warehouse } from '../../model/warehouse.model';
import { Employee } from '../../model/employee.model';
import { Report } from '../../model/report.model';
import { ReportItem } from '../../model/reportItem.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { ChangeItemsComponent } from './change-items/change-items.component';

class ReportItemDto {
  constructor(public byproductId: number, public quantityForDisposal: number) {}
}

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css'],
})
export class EditReportComponent implements OnInit, OnDestroy {
  warehouses: Warehouse[] = [];
  employees: Employee[] = [];

  editModeOn: boolean;
  reportSelected: boolean;

  reportForm: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    utilizationRate: new FormControl('', [
      Validators.required,
      Validators.min(0.00001),
      Validators.max(100),
    ]),
    note: new FormControl(),
    warehouse: new FormControl(null, Validators.required),
    employee: new FormControl(null, Validators.required),
  });

  private warehouseSub: Subscription;
  private employeeSub: Subscription;

  selectedReport: Report = null;

  @ViewChild(ChangeItemsComponent) changeItemsComponent: ChangeItemsComponent;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private warehouseService: WarehouseService,
    private employeeService: EmployeeService,
    private reportService: ReportService,
  ) {}

  ngOnInit(): void {
    this.editModeOn = false;

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

  onReportSelected(selectedReport: Report) {
    this.selectedReport = selectedReport;
    this.reportForm.get('date').setValue(this.selectedReport.date);
    this.reportForm
    .get('utilizationRate')
    .setValue(this.selectedReport.utilizationRate);
    this.reportForm.get('note').setValue(this.selectedReport.note);
    this.reportForm.get('warehouse').setValue(this.selectedReport.warehouse.id);
    this.reportForm.get('employee').setValue(this.selectedReport.employee.id);
    this.changeItemsComponent.setItems(selectedReport.items);
  }

  onItemsChanged(items:ReportItem[]){
    this.selectedReport.items = items;
  }

  ngOnDestroy(): void {
    this.warehouseSub.unsubscribe();
    this.employeeSub.unsubscribe();
  }

  onChangeReport() {
    this.editModeOn = true;
  }

  onUpdateReport() {
    const id: string = this.selectedReport.id;
    const date: Date = this.reportForm.get('date').value;
    const utilizationRate: number = this.reportForm.get('utilizationRate')
      .value;
    const note: string = this.reportForm.get('note').value;
    const warehouseId: number = this.reportForm.get('warehouse').value;
    const employeeId: number = this.reportForm.get('employee').value;
    const items: ReportItemDto[] = [];
    this.selectedReport.items.forEach((item) => {
      const itemDto = new ReportItemDto(
        item.byproduct.id,
        item.quantityForDisposal
      );
      items.push(itemDto);
    });
    this.reportService
      .updateReport(
        id,
        date,
        utilizationRate,
        note,
        warehouseId,
        employeeId,
        items
      )
      .subscribe(
        (report) => {
          this.selectedReport = report;
          this.changeItemsComponent.setItems(report.items);
          this.snackBar.open('Uspešno izmenjen izveštaj', '', {
            duration: 2000,
          });
        },
        (error) => {
          this.dialog.open(ErrorDialogComponent, {
            width: '40%',
            data: error.error.message,
          });
        }
      );
  }
}
