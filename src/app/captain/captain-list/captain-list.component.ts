import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CaptainService } from '../services/captain.service';
import { BoatService } from 'src/app/boat/services/boat.service';

@Component({
  selector: 'app-captain-list',
  templateUrl: './captain-list.component.html'
})
export class CaptainListComponent {
  
  constructor(private captainService: CaptainService, private boatService: BoatService) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  captains!: any;

  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.captains = this.captainService.getCaptains()
    .subscribe({
      next: (data) => {
        this.captains = data;
        this.dtTrigger.next(this.captains);
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'No se han podido recuperar los patrones',
          confirmButtonColor: '#8d448b'
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteCaptain(id: number) {
    Swal.fire({
      title: `¿Estás seguro de querer eliminar el patrón con id ${id}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.captainService.deleteCaptain(id)
        .subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Patrón borrado',
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


  getBoat(id: number) {
    this.boatService.getBoatById(id)
    .subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: `Barco con id ${id}, matrícula ${data.plate}, nombre ${data.name}`,
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
