import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Byproduct } from 'src/app/model/byproduct.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ByproductService } from 'src/app/service/byproduct.service';
import { ByproductModalComponent } from '../byproduct-modal/byproduct-modal.component';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component';

@Component({
  selector: 'app-byproducts-table',
  templateUrl: './byproducts-table.component.html',
  styleUrls: ['./byproducts-table.component.css']
})
export class ByproductsTableComponent implements OnInit, OnDestroy, AfterViewInit {
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
  ) { }

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
