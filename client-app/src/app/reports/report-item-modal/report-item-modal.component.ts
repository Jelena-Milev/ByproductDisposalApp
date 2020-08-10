import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportItem } from '../../model/reportItem.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-item-modal',
  templateUrl: './report-item-modal.component.html',
  styleUrls: ['./report-item-modal.component.css']
})
export class ReportItemModalComponent implements OnInit {

  updateItemForm:FormGroup = new FormGroup({
    byproductName: new FormControl(this.data.byproduct.name),
    quantity: new FormControl(this.data.quantityForDisposal, [Validators.required, Validators.min(0.1)])
  })

  constructor(public dialogRef: MatDialogRef<ReportItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportItem) { }

  ngOnInit(): void {
  }

  onUpdate(){
    this.data.quantityForDisposal = this.updateItemForm.get('quantity').value;
    this.dialogRef.close();
  }
}
