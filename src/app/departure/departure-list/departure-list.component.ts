import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DepartureService } from '../services/departure.service';
import { BoatService } from 'src/app/boat/services/boat.service';

@Component({
  selector: 'app-departure-list',
  templateUrl: './departure-list.component.html'
})
export class DepartureListComponent implements OnInit {

  constructor(private departureService: DepartureService, private boatService: BoatService) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  departures!: any;

  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.departures = this.departureService.getDepartures()
    .subscribe({
      next: (data) => {
        this.departures = data;
        this.dtTrigger.next(this.departures);
      },
      error: (error)=>{
        Swal.fire({
          icon: 'error',
          title: 'error',
          confirmButtonColor: '#8d448b'
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

  deleteDeparture(id: number) {
    Swal.fire({
      title: `¿Estás seguro de querer eliminar la salida con id ${id}?`,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.departureService.deleteDeparture(id)
        .subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Salida borrada',
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
