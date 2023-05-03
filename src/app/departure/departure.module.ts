import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartureListComponent } from './departure-list/departure-list.component';
import { DepartureAddComponent } from './departure-add/departure-add.component';
import { DepartureUpdateComponent } from './departure-update/departure-update.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DepartureListComponent,
    DepartureAddComponent,
    DepartureUpdateComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DepartureListComponent,
    DepartureAddComponent,
    DepartureUpdateComponent
  ]
})
export class DepartureModule { }
