import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MeasurementUnitService } from '../service/measurement-unit.service';
import { ByproductService } from '../service/byproduct.service';
import { MeasurementUnit } from '../model/measurementUnit.model';
import { Byproduct } from '../model/byproduct.model';

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

  private measurementUnitsSub: Subscription;
  private byproductsSub: Subscription;

  constructor(
    private umService: MeasurementUnitService,
    private byproductService: ByproductService
  ) {}

  ngOnInit(): void {
    this.measurementUnitsSub = this.umService.measurementUnits.subscribe(
      (um) => {
        this.measurementUnits = um;
      }
    );
    this.byproductsSub = this.byproductService.byproducts
      .subscribe(
      (byproducts) => {
        this.byproducts = byproducts;
      });
    this.umService.fetchMeasurementUnits().subscribe(() => {
      console.log(this.measurementUnits);
    });
    this.byproductService.fetchByproducts().subscribe(() => {
      console.log(this.byproducts);
    });
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
        console.log('add byproduct');
        console.log(this.byproducts);
      });
  }
}
