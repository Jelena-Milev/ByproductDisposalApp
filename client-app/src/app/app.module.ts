import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ByproductsComponent } from './byproducts/byproducts.component';
import { ReportsComponent } from './reports/reports.component';
import { HeaderComponent } from './header/header.component';
import { ByproductModalComponent } from './byproducts/byproduct-modal/byproduct-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ByproductsComponent,
    ReportsComponent,
    HeaderComponent,
    ByproductModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
