import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { MeasurementUnitService } from '../service/measurement-unit.service';
import { ByproductService } from '../service/byproduct.service';

import { MeasurementUnit } from '../model/measurementUnit.model';
import { Byproduct } from '../model/byproduct.model';
import { ByproductModalComponent } from './byproduct-modal/byproduct-modal.component';

@Component({
  selector: 'app-byproducts',
  templateUrl: './byproducts.component.html',
  styleUrls: ['./byproducts.component.css'],
})
export class ByproductsComponent implements OnInit, OnDestroy {
  measurementUnits: MeasurementUnit[] = [];
  byproducts: Byproduct[] = [];

  newByproductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    weightByUM: new FormControl(null, [Validators.required, Validators.min(1)]),
    measurementUnit: new FormControl(null, Validators.required),
  });

  displayedColumns: String[] = [
    'id',
    'name',
    'weight',
    'measurementUnit',
    'warehouse',
    'quantity',
    'edit',
    // 'delete',
  ];
  dataSource = new MatTableDataSource<Byproduct>();

  private measurementUnitsSub: Subscription;
  private byproductsSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private umService: MeasurementUnitService,
    private byproductService: ByproductService
  ) {}

  ngOnInit(): void {
    this.measurementUnitsSub = this.umService.measurementUnits.subscribe(
      (um) => {
        this.measurementUnits = um;
      }
    );
    this.byproductsSub = this.byproductService.byproducts.subscribe(
      (byproducts) => {
        this.byproducts = byproducts;
        this.dataSource.data = byproducts;
      }
    );
    this.umService.fetchMeasurementUnits().subscribe(() => {});
    this.byproductService.fetchByproducts().subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.measurementUnitsSub.unsubscribe();
    this.byproductsSub.unsubscribe();
  }

  addByproduct() {
    console.log(this.newByproductForm);
    this.byproductService
      .addByproduct(
        this.newByproductForm.get('name').value,
        this.newByproductForm.get('weightByUM').value,
        this.newByproductForm.get('measurementUnit').value
      )
      .subscribe(() => {
        this.newByproductForm.reset();
        this.newByproductForm.markAsPristine();
        this.newByproductForm.markAsUntouched();
      });
  }

  onEditByproduct(byproduct: Byproduct) {
     const dialogRef = this.dialog.open(ByproductModalComponent, {
      width: '40%',
      data: byproduct,
    });
  }

  onDeleteByproduct(byproduct: Byproduct) {
    this.byproductService.deleteByproduct(byproduct.id).subscribe();
  }
}
