import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  exports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  imports: [MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class MaterialModule {}
