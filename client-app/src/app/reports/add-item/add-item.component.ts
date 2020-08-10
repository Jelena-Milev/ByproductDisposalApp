import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ByproductService } from 'src/app/service/byproduct.service';
import { Byproduct } from 'src/app/model/byproduct.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy, AfterViewInit {

  byproducts: Byproduct[] = [];

  itemForm: FormGroup = new FormGroup({
    byproduct: new FormControl(),
    quantityForDisposal: new FormControl(),
  });

  private byproductSub: Subscription;

  constructor(
    private byproductService: ByproductService
  ) { }

  ngOnInit(): void {
    this.byproductSub = this.byproductService.fetchByproducts().subscribe((res) => {
          this.byproducts = res;
        });
  }

  ngAfterViewInit(): void {
    this.byproductService.fetchByproducts().subscribe();
  }
  ngOnDestroy(): void {
    this.byproductSub.unsubscribe();
  }

  onAddItem() {
  //   const byproduct = this.itemForm.get('byproduct').value;
  //   const quantityForDisposal = this.itemForm.get('quantityForDisposal').value;
  //   const itemIndex: number = this.selectedReport.items.findIndex(
  //     (item) => item.byproduct.name === byproduct.name
  //   );
  //   if (itemIndex === -1) {
  //     const newItem: ReportItem = new ReportItem(
  //       byproduct,
  //       quantityForDisposal
  //     );
  //     this.selectedReport.items.push(newItem);
  //   } else {
  //     this.selectedReport.items[
  //       itemIndex
  //     ].quantityForDisposal += quantityForDisposal;
  //   }
  //   this.dataSource.data = this.selectedReport.items;
  //   this.itemForm.reset();
  //   this.itemForm.markAsPristine();
  //   this.itemForm.markAllAsTouched();
  }
}
