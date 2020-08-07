import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Byproduct } from 'src/app/model/byproduct.model';
import { MeasurementUnit } from 'src/app/model/measurementUnit.model';
import { MeasurementUnitService } from 'src/app/service/measurement-unit.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import { Subscription } from 'rxjs';
import { Warehouse } from 'src/app/model/warehouse.model';

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

  constructor(
    private measurementUnitService: MeasurementUnitService,
    private warehouseService: WarehouseService,
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

  onEdit() {}
}
