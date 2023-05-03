import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { BoatService } from '../services/boat.service';
import { MemberService } from 'src/app/member/services/member.service';
import { CaptainService } from 'src/app/captain/services/captain.service';

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html'
})
export class BoatListComponent implements OnInit {

  constructor(private boatService: BoatService, private memberService: MemberService, private captainService: CaptainService) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  boats!: any;

  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.boats = this.boatService.getBoats()
    .subscribe({
      next: (data) => {
        this.boats = data;
        this.dtTrigger.next(this.boats);
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'No se han podido recuperar los barcos',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  deleteBoat(id: number) {
    Swal.fire({
      title: `¿Estás seguro de querer eliminar el barco con id ${id}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.boatService.deleteBoat(id)
        .subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Barco borrado',
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

  getOwner(id: number) {
    this.memberService.getMemberById(id)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: `Socio con id ${id}, dni ${data.idNumber}, nombre ${data.name}, número de socio ${data.memberNumber}`,
          confirmButtonColor: '#8d448b'
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

  getCaptain(id: number) {
    this.captainService.getCaptainById(id)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: `Capitán con id ${id}, dni ${data.idNumber}, nombre ${data.name}, título ${data.titleNumber}`,
          confirmButtonColor: '#8d448b'
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
}
