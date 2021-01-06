import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ReportService } from '../../service/report.service';
import { Warehouse } from '../../model/warehouse.model';
import { Employee } from '../../model/employee.model';
import { ReportItem } from '../../model/reportItem.model';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../state';
import { loadEmployees } from '../../state/employees/employee.actions';
import { loadWarehouses_AddReport } from '../../state/warehouses/warehouses.actions';
import { selectEmployees } from '../../state/employees/employee.selectors';
import { selectWarehouses } from '../../state/warehouses/warehouses.selectors';
import { addReport } from '../state/report.actions';
import {AddItemComponent} from './add-item/add-item.component';

class ReportItemDto {
  constructor(public byproductId: number, public quantityForDisposal: number) {}
}

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent implements OnInit {
  reportForm: FormGroup = new FormGroup({
    date: new FormControl(Validators.required),
    utilizationRate: new FormControl('', [
      Validators.required,
      Validators.min(0.001),
      Validators.max(100),
    ]),
    note: new FormControl(),
    warehouseId: new FormControl(null, Validators.required),
    employeeId: new FormControl(null, Validators.required),
  });

  warehouses$: Observable<Warehouse[]>;
  employees$: Observable<Employee[]>;

  items: ReportItem[] = [];

  @ViewChild(AddItemComponent) addItemComponent: AddItemComponent;

  constructor(
    private store: Store<AppState>
  ) {
    this.employees$ = this.store.select(selectEmployees);
    this.warehouses$ = this.store.select(selectWarehouses);
  }

  ngOnInit(): void {
    this.store.dispatch(loadEmployees());
    this.store.dispatch(loadWarehouses_AddReport());
  }

  itemsChanged(items: ReportItem[]) {
    this.items = items;
  }

  onSaveReport() {
    const formValue = this.reportForm.value;
    // const date: Date = this.reportForm.get('date').value;
    // const utilizationRate: number = this.reportForm.get('utilizationRate')
    //   .value;
    // const note: string = this.reportForm.get('note').value;
    // const warehouseId: number = this.reportForm.get('warehouse').value;
    // const employeeId: number = this.reportForm.get('employee').value;
    const items: ReportItemDto[] = [];
    this.items.forEach((item) => {
      const itemDto = new ReportItemDto(
        item.byproduct.id,
        item.quantityForDisposal
      );
      items.push(itemDto);
    });
    this.store.dispatch(
      addReport({ ...formValue, items })
    );
    this.clearReportForm();
    this.reportForm.setValue(formValue);
    // this.reportService
    //   .saveReport(date, utilizationRate, note, warehouseId, employeeId, items)
    //   .subscribe((report) => {
    //     this.reportForm.get('date').setValue(report.date);
    //     this.reportForm.get('utilizationRate').setValue(report.utilizationRate);
    //     this.reportForm.get('note').setValue(report.note);
    //     this.reportForm.get('warehouse').setValue(report.warehouse.id);
    //     this.reportForm.get('employee').setValue(report.employee.id);
    //     this.snackBar.open('Uspešno sačuvan izveštaj broj'+report.id, '', {
    //       duration: 2000,
    //     });
    //     this.reportForm.reset();
    //     this.reportForm.markAsPristine();
    //     this.reportForm.markAsUntouched();
    //   },
    //   (error) => {
    //     this.dialog.open(ErrorDialogComponent, {
    //       width: '40%',
    //       data: error.error.message,
    //     });
    //   });
  }

  clearReportForm(){
    this.reportForm.reset();
    this.reportForm.markAsPristine();
    this.reportForm.markAsUntouched();
  }
}
