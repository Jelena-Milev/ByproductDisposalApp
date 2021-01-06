import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeasurementUnit } from 'src/app/model/measurementUnit.model';
import { Subscription } from 'rxjs';
import { MeasurementUnitService } from 'src/app/service/measurement-unit.service';
import { MatDialog } from '@angular/material/dialog';
import { ByproductService } from 'src/app/service/byproduct.service';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../state';
import {Byproduct} from '../../model/byproduct.model';
import {addByproduct} from '../state/byproduct.actions';

@Component({
  selector: 'app-add-byproduct-form',
  templateUrl: './add-byproduct-form.component.html',
  styleUrls: ['./add-byproduct-form.component.css'],
})
export class AddByproductFormComponent implements OnInit, OnDestroy {
  measurementUnits: MeasurementUnit[] = [];
  newByproductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    weightPerUM: new FormControl(null, [
      Validators.required,
      Validators.min(0.00001),
    ]),
    measurementUnitId: new FormControl(null, Validators.required),
  });

  private measurementUnitsSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private umService: MeasurementUnitService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.measurementUnitsSub = this.umService.measurementUnits.subscribe(
      (um) => {
        this.measurementUnits = um;
      }
    );
    this.umService.fetchMeasurementUnits().subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.measurementUnitsSub.unsubscribe();
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
