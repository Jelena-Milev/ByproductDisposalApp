import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeasurementUnit } from 'src/app/model/measurementUnit.model';
import {Observable, Subscription} from 'rxjs';
import { MeasurementUnitService } from 'src/app/service/measurement-unit.service';
import { MatDialog } from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AppState} from '../../state';
import {addByproduct} from '../state/byproduct.actions';
import {loadMeasurementUnits} from '../../state/measurementUnits/measurement-unit.actions';
import {selectMeasurementUnits} from '../../state/measurementUnits/measurement-unit.selectors';

@Component({
  selector: 'app-add-byproduct-form',
  templateUrl: './add-byproduct-form.component.html',
  styleUrls: ['./add-byproduct-form.component.css'],
})
export class AddByproductFormComponent implements OnInit {

  measurementUnits$: Observable<MeasurementUnit[]>;

  newByproductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    weightPerUM: new FormControl(null, [
      Validators.required,
      Validators.min(0.00001),
    ]),
    measurementUnitId: new FormControl(null, Validators.required),
  });

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.measurementUnits$ = this.store.select(selectMeasurementUnits);
  }

  ngOnInit(): void {
    this.store.dispatch(loadMeasurementUnits());
  }

  addByproduct() {
    const formValue = this.newByproductForm.value;
    this.store.dispatch(
      addByproduct({
        name: formValue.name,
        weightPerUM: formValue.weightPerUM,
        measurementUnitId: formValue.measurementUnitId,
      })
    );
    this.clearForm();
  }

  public clearForm() {
    this.newByproductForm.reset();
    this.newByproductForm.markAsPristine();
    this.newByproductForm.markAsUntouched();
  }
}
