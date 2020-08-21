import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { MeasurementUnitService } from '../service/measurement-unit.service';
import { ByproductService } from '../service/byproduct.service';

import { MeasurementUnit } from '../model/measurementUnit.model';
import { Byproduct } from '../model/byproduct.model';
import { ByproductModalComponent } from './byproduct-modal/byproduct-modal.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-byproducts',
  templateUrl: './byproducts.component.html',
  styleUrls: ['./byproducts.component.css'],
})
export class ByproductsComponent implements OnInit, OnDestroy, AfterViewInit {
  byproducts: Byproduct[] = [];

  displayedColumns: String[] = [
    'id',
    'name',
    'weight',
    'measurementUnit',
    'warehouse',
    'quantity',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Byproduct>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  private byproductsSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private byproductService: ByproductService
  ) {}

  ngOnInit(): void {
    this.byproductsSub = this.byproductService.byproducts.subscribe(
      (byproducts) => {
        this.byproducts = byproducts;
        this.dataSource.data = byproducts;
      }
    );
    this.byproductService.fetchByproducts().subscribe(() => {});
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.byproductsSub.unsubscribe();
  }

  onEditByproduct(byproduct: Byproduct) {
    const dialogRef = this.dialog.open(ByproductModalComponent, {
      width: '40%',
      data: byproduct,
    });
  }

  onDeleteByproduct(byproduct: Byproduct) {
    this.byproductService.deleteByproduct(byproduct.id).subscribe(
      () => {},
      (error) => {
        this.dialog.open(ErrorDialogComponent, {
          width: '40%',
          data: "Nije moguce obrisati nusproizvod koji je zaveden u izvestaju",
        });
        console.log(error);
      }
    );
  }
}
