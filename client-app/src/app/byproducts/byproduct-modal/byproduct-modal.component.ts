import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {Observable} from 'rxjs';

import { Warehouse } from 'src/app/model/warehouse.model';
import { Byproduct } from 'src/app/model/byproduct.model';
import { MeasurementUnit } from 'src/app/model/measurementUnit.model';
import {editByproduct} from '../state/byproduct.actions';
import {AppState} from '../../state';
import {Store} from '@ngrx/store';
import {loadMeasurementUnits_BpModal} from '../../state/measurementUnits/measurement-unit.actions';
import {selectMeasurementUnits} from '../../state/measurementUnits/measurement-unit.selectors';
import {selectWarehouses} from '../../state/warehouses/warehouses.selectors';
import {loadWarehouses} from '../../state/warehouses/warehouses.actions';

@Component({
  selector: 'app-byproduct-modal',
  templateUrl: './byproduct-modal.component.html',
  styleUrls: ['./byproduct-modal.component.css'],
})
export class ByproductModalComponent implements OnInit {
  measurementUnits$: Observable<MeasurementUnit[]>;
  warehouses$: Observable<Warehouse[]>;

  editByproductForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    weightPerUM: new FormControl(this.data.weightPerUM, [
      Validators.required,
      Validators.min(0.00001),
    ]),
    measurementUnitId: new FormControl(
      this.data.measurementUnit.id,
      Validators.required
    ),
    warehouseId: new FormControl(this.data.warehouse?.id, Validators.required),
    quantity: new FormControl(this.data.quantity, [
      Validators.required,
      Validators.min(0.00001),
    ]),
  });

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<ByproductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Byproduct
  ) {
    this.measurementUnits$ = this.store.select(selectMeasurementUnits);
    this.warehouses$ = this.store.select(selectWarehouses);
  }

  ngOnInit(): void {
    this.store.dispatch(loadMeasurementUnits_BpModal());
    this.store.dispatch(loadWarehouses());
  }

  onCancel() {
    this.dialogRef.close();
  }

  onEdit() {
    const id = this.data.id;
    const name = this.editByproductForm.get('name').value;
    const weightPerUM = this.editByproductForm.get('weightPerUM').value;
    const measurementUnitId = this.editByproductForm.get('measurementUnitId').value;
    const warehouseId = this.editByproductForm.get('warehouseId').value;
    const quantity = this.editByproductForm.get('quantity').value;
    this.store.dispatch(
      editByproduct({
        id,
        name,
        quantity,
        weightPerUM,
        warehouseId,
        measurementUnitId,
      })
    );
    this.dialogRef.close();
  }
}
