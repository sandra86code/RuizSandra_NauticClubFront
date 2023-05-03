import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { MemberService } from '../services/member.service';
import { DataTableDirective } from 'angular-datatables';
import { MembersResponse } from '../interfaces/member.interface';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html'
})
export class MemberListComponent implements OnInit {

  constructor(private memberService: MemberService) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  members!: any

  member!: MembersResponse;
  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.members = this.memberService.getMembers()
    .subscribe({
      next: (data) => {
        this.members = data;
        this.dtTrigger.next(this.members);
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'No se han podido recuperar los socios',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteMember(id: number) {
    Swal.fire({
      title: `¿Estás seguro de querer eliminar el socio con id ${id}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.memberService.deleteMember(id)
        .subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Socio borrado',
              confirmButtonColor: '#8d448b'
            })
            .then((result) => {
              location.reload();
            })
          },
          error: (error)=>{
            Swal.fire({
              icon: 'error',
              title: error.message,
              confirmButtonColor: '#8d448b'
            })
          }
        })
      }
    })
  }
}
