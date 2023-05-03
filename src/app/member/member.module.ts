import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberAddComponent } from './member-add/member-add.component';
import { MemberUpdateComponent } from './member-update/member-update.component';
import { MemberListComponent } from './member-list/member-list.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MemberAddComponent,
    MemberUpdateComponent,
    MemberListComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MemberAddComponent,
    MemberUpdateComponent,
    MemberListComponent
  ]
})
export class MemberModule { }
