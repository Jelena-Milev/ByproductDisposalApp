import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Byproduct } from 'src/app/model/byproduct.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {Observable, Subscription} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ByproductModalComponent } from '../byproduct-modal/byproduct-modal.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../state';
import {deleteByproduct, loadByproducts_BpTable} from '../state/byproduct.actions';
import {selectByproducts, selectByproductsLoaded} from '../state/byproduct.selectors';

@Component({
  selector: 'app-byproducts-table',
  templateUrl: './byproducts-table.component.html',
  styleUrls: ['./byproducts-table.component.css']
})
export class ByproductsTableComponent implements OnInit, AfterViewInit {

  byproducts$: Observable<Byproduct[]>;
  byproductsLoaded$: Observable<boolean>;

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

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.byproducts$ = this.store.select(selectByproducts);
    this.byproductsLoaded$ = this.store.select(selectByproductsLoaded);
  }

  ngOnInit(): void {
    this.store.dispatch(loadByproducts_BpTable());
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onEditByproduct(byproduct: Byproduct) {
    const dialogRef = this.dialog.open(ByproductModalComponent, {
      width: '40%',
      data: byproduct,
    });
  }

  onDeleteByproduct(byproduct: Byproduct) {
    this.store.dispatch(deleteByproduct({byproductId: byproduct.id}));
  }
}
