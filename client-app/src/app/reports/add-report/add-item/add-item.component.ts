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
import { Byproduct } from 'src/app/model/byproduct.model';
import {Observable, Subscription} from 'rxjs';
import { ReportItem } from 'src/app/model/reportItem.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {AppState} from '../../../state';
import {selectByproducts} from '../../../byproducts/state/byproduct.selectors';
import { loadByproducts_AddReportItem} from '../../../byproducts/state/byproduct.actions';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit, AfterViewInit {
  byproducts$: Observable<Byproduct[]>;

  itemForm: FormGroup = new FormGroup({
    byproduct: new FormControl(null, Validators.required),
    quantityForDisposal: new FormControl('', [Validators.required, Validators.min(0.001)]),
  });

  dataSource = new MatTableDataSource<ReportItem>();
  displayedColumns: string[] = [
    'id',
    'byproductName',
    'measurementUnit',
    'quantityForDisposal',
    'delete',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  items: ReportItem[] = [];
  @Output() onItemsChanged: EventEmitter<ReportItem[]> = new EventEmitter<
    ReportItem[]
  >();

  constructor(private store: Store<AppState>) {
    this.byproducts$ = this.store.select(selectByproducts);
  }

  ngOnInit(): void {
    this.dataSource.data = this.items;
    this.store.dispatch(loadByproducts_AddReportItem());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
