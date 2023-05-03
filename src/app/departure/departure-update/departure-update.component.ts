import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartureService } from '../services/departure.service';
import { BoatService } from 'src/app/boat/services/boat.service';
import { DeparturesResponse } from '../interfaces/departure.interface';

@Component({
  selector: 'app-departure-update',
  templateUrl: './departure-update.component.html'
})
export class DepartureUpdateComponent implements OnInit {

  constructor(private service: DepartureService, private route: Router, private fb: FormBuilder,
    private boatService: BoatService, private activatedRoute: ActivatedRoute) { }

  departureId!: any;
  departureDate!: Date;
  destination: string ="";
  boatId: number = -1;
  boatPlate: string = "";

  boats!: any;

  departure!: DeparturesResponse;

  myForm: FormGroup = this.fb.group({
    departureId: [this.departureId, [Validators.required]],
    departureDate: [this.departureDate, [Validators.required]],
    destination: [this.destination, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    boatId: [this.boatId, [Validators.required]]
  })

  ngOnInit(): void {
    this.departureId = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getDepartureById(this.departureId)
      .subscribe({
        next: res => {
          this.departure = res;
          this.myForm.setValue({
            departureId: this.departure.id,
            departureDate: this.departure.departureDate,
            destination: this.departure.destination,
            boatId: this.departure.boatId
          })
        }
      })
    this.getBoats();
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  updateDeparture() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.editDeparture(this.departureId, this.myForm.value.departureDate, this.myForm.value.destination, this.myForm.value.boatId)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Salida actualizada',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/departures')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Salida no actualizada',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/departures')
          }
        })
    }
  }

  getBoats() {
    this.boatService.getBoats()
    .subscribe({
      next: (data) => {
        this.boats = data;
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

  goBack() {
    window.history.back();
  }
}


