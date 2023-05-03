import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartureService } from '../services/departure.service';
import { BoatService } from 'src/app/boat/services/boat.service';

@Component({
  selector: 'app-departure-add',
  templateUrl: './departure-add.component.html'
})
export class DepartureAddComponent implements OnInit {
  
  constructor(private service: DepartureService, private route: Router, private fb: FormBuilder,
    private boatService: BoatService) { }


  departureDate!: Date;
  destination: string ="";
  boatId: number = -1;
  boatPlate: string = "";

  boats!: any;

  myForm: FormGroup = this.fb.group({
    departureDate: ['', [Validators.required]],
    destination: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    boatId: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.getBoats();
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  addDeparture() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.addDeparture(this.myForm.value.departureDate, this.myForm.value.destination, this.myForm.value.boatId)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Salida añadida',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/departures')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Salida no añadido',
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

