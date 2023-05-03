import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatListComponent } from './boat-list/boat-list.component';
import { BoatAddComponent } from './boat-add/boat-add.component';
import { BoatUpdateComponent } from './boat-update/boat-update.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BoatListComponent,
    BoatAddComponent,
    BoatUpdateComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BoatListComponent,
    BoatAddComponent,
    BoatUpdateComponent
  ]
})
export class BoatModule { }
