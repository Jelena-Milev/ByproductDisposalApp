import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MeasurementUnitService } from '../service/measurement-unit.service';
import { MeasurementUnit } from '../model/measurementUnit.model';

@Component({
  selector: 'app-byproducts',
  templateUrl: './byproducts.component.html',
  styleUrls: ['./byproducts.component.css'],
})
export class ByproductsComponent implements OnInit, OnDestroy {
  // measurementUnits: String[] = ['Kilogram', 'Metar', 'Litar', 'Tona'];
  measurementUnits: MeasurementUnit[] = [];

  newByproductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    quantityByUM: new FormControl(null, [
      Validators.required,
      Validators.min(1),
    ]),
    measurementUnit: new FormControl(null, Validators.required),
  });

  private sub: Subscription;

  constructor(private umService: MeasurementUnitService) {}

  ngOnInit(): void {
    this.sub = this.umService.getMeasurementUnits().subscribe(um=>{
      this.measurementUnits = um;
    });

    this.umService.fetchMeasurementUnits().subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  addByproduct() {
    console.log(this.newByproductForm);
  }
}
