import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ByproductService } from 'src/app/service/byproduct.service';
import { Byproduct } from 'src/app/model/byproduct.model';
import { Subscription } from 'rxjs';
import { ReportItem } from 'src/app/model/reportItem.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit, OnDestroy, AfterViewInit {
  byproducts: Byproduct[] = [];

  itemForm: FormGroup = new FormGroup({
    byproduct: new FormControl(null, Validators.required),
    quantityForDisposal: new FormControl('', [Validators.required, Validators.min(0.001)]),
  });

  private byproductSub: Subscription;

  dataSource = new MatTableDataSource<ReportItem>();
  displayedColumns: string[] = [
    'id',
    'byproductName',
    'measurementUnit',
    'quantityForDisposal',
    'delete',
  ];
  // private paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  items: ReportItem[] = [];
  @Output() onItemsChanged: EventEmitter<ReportItem[]> = new EventEmitter<
    ReportItem[]
  >();

  constructor(private byproductService: ByproductService) {}

  // @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
  //   this.paginator = mp;
  //   this.setDataSourceAttributes();
  // }

  // setDataSourceAttributes() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.dataSource.data = this.items;
    this.byproductSub = this.byproductService
      .fetchByproducts()
      .subscribe((res) => {
        this.byproducts = res;
      });
  }

  ngAfterViewInit(): void {
    // this.dataSource.data = this.items;
    this.dataSource.paginator = this.paginator;
    this.byproductService.fetchByproducts().subscribe();
  }
  ngOnDestroy(): void {
    this.byproductSub.unsubscribe();
  }

  onAddItem() {
    const byproduct = this.itemForm.get('byproduct').value;
    const quantityForDisposal = this.itemForm.get('quantityForDisposal').value;
    const itemIndex: number = this.items.findIndex(
      (item) => item.byproduct.name === byproduct.name
    );
    if (itemIndex === -1) {
      const newItem: ReportItem = new ReportItem(
        byproduct,
        quantityForDisposal
      );
      this.items.push(newItem);
    } else {
      this.items[itemIndex].quantityForDisposal += quantityForDisposal;
    }
    this.dataSource.data = this.items;
    this.onItemsChanged.emit(this.items);
  }

  onDeleteItem(element: ReportItem) {
    const itemIndex = this.items.findIndex(
      (item) => item.byproduct.name === element.byproduct.name
    );
    this.items.splice(itemIndex, 1);
    this.dataSource.data = this.items;
    this.onItemsChanged.emit(this.items);
  }
}
