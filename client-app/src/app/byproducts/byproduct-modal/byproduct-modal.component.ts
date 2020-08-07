import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { forkJoin } from 'rxjs';

import { WarehouseService } from 'src/app/service/warehouse.service';
import { MeasurementUnitService } from 'src/app/service/measurement-unit.service';
import { Warehouse } from 'src/app/model/warehouse.model';
import { Byproduct } from 'src/app/model/byproduct.model';
import { MeasurementUnit } from 'src/app/model/measurementUnit.model';
import { mergeMap } from 'rxjs/operators';
import { ByproductService } from 'src/app/service/byproduct.service';

@Component({
  selector: 'app-byproduct-modal',
  templateUrl: './byproduct-modal.component.html',
  styleUrls: ['./byproduct-modal.component.css'],
})
export class ByproductModalComponent implements OnInit, OnDestroy {
  measurementUnits: MeasurementUnit[];
  warehouses: Warehouse[];

  private umSub: Subscription;
  private warehousesSub: Subscription;

  editByproductForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    weightPerUM: new FormControl(this.data.weightPerUM, [
      Validators.required,
      Validators.min(1),
    ]),
    measurementUnitId: new FormControl(
      this.data.measurementUnit.id,
      Validators.required
    ),
    warehouseId: new FormControl(this.data.warehouse?.id, Validators.required),
    quantity: new FormControl(this.data.quantity, [
      Validators.required,
      Validators.min(0),
    ]),
  });

  constructor(
    private measurementUnitService: MeasurementUnitService,
    private warehouseService: WarehouseService,
    private byproductService: ByproductService,
    public dialogRef: MatDialogRef<ByproductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Byproduct
  ) {}

  ngOnInit(): void {
    this.umSub = this.measurementUnitService
      .fetchMeasurementUnits()
      .subscribe((result) => {
        this.measurementUnits = result;
      });
    this.warehousesSub = this.warehouseService
      .fetchWarehouses()
      .subscribe((res) => {
        this.warehouses = res;
      });
  }

  ngOnDestroy(): void {
    this.umSub.unsubscribe();
    this.warehousesSub.unsubscribe();
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
    this.byproductService
      .editByproduct(
        id,
        name,
        quantity,
        weightPerUM,
        warehouseId,
        measurementUnitId
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
