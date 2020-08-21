import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeasurementUnit } from 'src/app/model/measurementUnit.model';
import { Subscription } from 'rxjs';
import { MeasurementUnitService } from 'src/app/service/measurement-unit.service';
import { MatDialog } from '@angular/material/dialog';
import { ByproductService } from 'src/app/service/byproduct.service';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-byproduct-form',
  templateUrl: './add-byproduct-form.component.html',
  styleUrls: ['./add-byproduct-form.component.css'],
})
export class AddByproductFormComponent implements OnInit, OnDestroy {
  measurementUnits: MeasurementUnit[] = [];
  newByproductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    weightByUM: new FormControl(null, [
      Validators.required,
      Validators.min(0.00001),
    ]),
    measurementUnit: new FormControl(null, Validators.required),
  });

  private measurementUnitsSub: Subscription;

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
    this.umService.fetchMeasurementUnits().subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.measurementUnitsSub.unsubscribe();
  }

  addByproduct() {
    this.byproductService
      .addByproduct(
        this.newByproductForm.get('name').value,
        this.newByproductForm.get('weightByUM').value,
        this.newByproductForm.get('measurementUnit').value
      )
      .subscribe(
        () => {
          this.newByproductForm.reset();
          this.newByproductForm.markAsPristine();
          this.newByproductForm.markAsUntouched();
        },
        (error) => {
          this.dialog.open(ErrorDialogComponent, {
            width: '40%',
            data: error.error.message,
          });
        }
      );
  }
}
