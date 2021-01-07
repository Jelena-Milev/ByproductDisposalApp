import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Byproduct } from 'src/app/model/byproduct.model';
import { ByproductService } from 'src/app/service/byproduct.service';
import { ReportItem } from 'src/app/model/reportItem.model';
import { ReportItemModalComponent } from '../../report-item-modal/report-item-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-change-items',
  templateUrl: './change-items.component.html',
  styleUrls: ['./change-items.component.css'],
})
export class ChangeItemsComponent implements OnInit{
  itemForm: FormGroup = new FormGroup({
    byproduct: new FormControl(null, Validators.required),
    quantityForDisposal: new FormControl('', [
      Validators.required,
      Validators.min(0.001),
    ]),
  });

  @Input() editModeOn: boolean;

  byproducts: Byproduct[] = [];

  @Input() items: ReportItem[] = [];

  @Output() itemChanged: EventEmitter<ReportItem[]> = new EventEmitter<ReportItem[]>();

  dataSource = new MatTableDataSource<ReportItem>();
  displayedColumns: string[] = [
    'id',
    'byproductName',
    'measurementUnit',
    'quantityForDisposal',
    'edit',
    'delete',
  ];

  constructor(
    private dialog: MatDialog,
    private byproductService: ByproductService
  ) {}


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  setItems(newItems: ReportItem[]){
    if(newItems == null || newItems.length === 0) return;
    this.items = newItems;
    this.dataSource.data = newItems;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.editModeOn = false;
    this.byproductService.fetchByproducts().subscribe((res) => {
      this.byproducts = res;
    });
    this.dataSource.data = this.items;
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
    this.itemChanged.emit(this.items);
  }

  onDeleteItem(element: ReportItem) {
    const itemIndex = this.items.findIndex(
      (item) => item.byproduct.name === element.byproduct.name
    );
    this.items.splice(itemIndex, 1);
    this.dataSource.data = this.items;
    this.itemChanged.emit(this.items);
  }

  onUpdateItem(element: ReportItem) {
    const dialogRef = this.dialog.open(ReportItemModalComponent, {
      width: '40%',
      data: element,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dataSource.data = this.items;
      this.itemChanged.emit(this.items);
    });
  }
}
