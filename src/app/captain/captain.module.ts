import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptainListComponent } from './captain-list/captain-list.component';
import { CaptainAddComponent } from './captain-add/captain-add.component';
import { CaptainUpdateComponent } from './captain-update/captain-update.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CaptainListComponent,
    CaptainAddComponent,
    CaptainUpdateComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CaptainListComponent,
    CaptainAddComponent,
    CaptainUpdateComponent
  ]
})
export class CaptainModule { }
