import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CaptainService } from '../services/captain.service';
import { CaptainsResponse } from '../interfaces/captain.interface';
import { BoatService } from 'src/app/boat/services/boat.service';

@Component({
  selector: 'app-captain-update',
  templateUrl: './captain-update.component.html'
})
export class CaptainUpdateComponent {

  constructor(private service: CaptainService, private route: Router, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private boatService: BoatService) { }
  
  id: any;
  
  idNumber: string = "";
  name: string = "";
  email: string ="";
  phone: string = "";
  titleNumber: string = "";
  boatId: string = "";

  captain!: CaptainsResponse;
  boats!: any;

  myForm: FormGroup = this.fb.group({
    idNumber: [this.idNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    name: [this.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: [this.email, [Validators.required, Validators.email]],
    phone: [this.phone, [Validators.required, Validators.minLength(9)]],
    titleNumber: [this.titleNumber, [Validators.required, Validators.minLength(7), Validators.maxLength(30)]]
  })

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getCaptainById(parseInt(this.id))
      .subscribe({
        next: res => {
          this.captain = res;
          this.myForm.setValue({
            idNumber: this.captain.idNumber,
            name: this.captain.name,
            email: this.captain.email,
            phone: this.captain.phone,
            titleNumber: this.captain.titleNumber,
            boatId: this.captain.boatId
          })
        }
      })
    this.getBoats();
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  editCaptain() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.editCaptain(this.captain.id, this.myForm.value.idNumber, this.myForm.value.name, this.myForm.value.email, 
        this.myForm.value.phone, this.myForm.value.titleNumber)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Patrón editado',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/captains')
          },
          error: (error) => {
            let message = "";
            if(error.status === 400){
              if(error.error.includes('constraint [email]')) {
                message = 'Pruebe otro email'
              }
              if(error.error.includes('constraint [person_dni]')) {
                message = 'Pruebe otro dni'
              }
              if(error.error.includes('constraint [title_number]')) {
                message = 'Pruebe otro número de titulación'
              }
              Swal.fire({
                icon: 'error',
                title: message,
                confirmButtonColor: '#8d448b'
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Patrón no editado',
                confirmButtonColor: '#8d448b'
              })
            }
          }
        })
    }
  }

  goBack() {
    window.history.back();
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
}


