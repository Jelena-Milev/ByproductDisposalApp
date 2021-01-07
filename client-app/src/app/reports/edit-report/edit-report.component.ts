import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { Warehouse } from '../../model/warehouse.model';
import { Employee } from '../../model/employee.model';
import { Report } from '../../model/report.model';
import { ReportItem } from '../../model/reportItem.model';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import { ChangeItemsComponent } from './change-items/change-items.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../state';
import { selectWarehouses } from '../../state/warehouses/warehouses.selectors';
import { selectEmployees } from '../../state/employees/employee.selectors';
import { loadEmployees_EditReport } from '../../state/employees/employee.actions';
import { loadWarehouses_EditReport } from '../../state/warehouses/warehouses.actions';
import { editReport } from '../state/report.actions';

class ReportItemDto {
  constructor(public byproductId: number, public quantityForDisposal: number) {}
}

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css'],
})
export class EditReportComponent implements OnInit {
  warehouses$: Observable<Warehouse[]>;
  employees$: Observable<Employee[]>;

  editModeOn: boolean;

  reportForm: FormGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    utilizationRate: new FormControl('', [
      Validators.required,
      Validators.min(0.00001),
      Validators.max(100),
    ]),
    note: new FormControl(),
    warehouseId: new FormControl(null, Validators.required),
    employeeId: new FormControl(null, Validators.required),
  });

  selectedReport: Report = null;

  @ViewChild(ChangeItemsComponent) changeItemsComponent: ChangeItemsComponent;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
  ) {
    this.warehouses$ = this.store.select(selectWarehouses);
    this.employees$ = this.store.select(selectEmployees);
  }

  ngOnInit(): void {
    this.editModeOn = false;

    this.store.dispatch(loadEmployees_EditReport());
    this.store.dispatch(loadWarehouses_EditReport());
  }

  onReportSelected(selectedReport: Report) {
    this.selectedReport = selectedReport;
    this.reportForm.get('date').setValue(this.selectedReport?.date);
    this.reportForm
      .get('utilizationRate')
      .setValue(this.selectedReport?.utilizationRate);
    this.reportForm.get('note').setValue(this.selectedReport?.note);
    this.reportForm.get('warehouseId').setValue(this.selectedReport?.warehouse.id);
    this.reportForm.get('employeeId').setValue(this.selectedReport?.employee.id);
    this.changeItemsComponent.setItems(selectedReport?.items);
  }

  onItemsChanged(items: ReportItem[]) {
    this.selectedReport.items = items;
  }

  onChangeReport() {
    this.editModeOn = true;
  }

  onUpdateReport() {
    const id = this.selectedReport.id;
    const formValue = this.reportForm.value;
    const items: ReportItemDto[] = [];
    this.selectedReport.items.forEach((item) => {
      const itemDto = new ReportItemDto(
        item.byproduct.id,
        item.quantityForDisposal
      );
      items.push(itemDto);
    });
    this.store.dispatch(editReport({
        id,
        ...formValue,
        items,
      }));
  }
}
