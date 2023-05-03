import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CaptainService } from '../services/captain.service';

@Component({
  selector: 'app-captain-add',
  templateUrl: './captain-add.component.html'
})
export class CaptainAddComponent implements OnInit {

  constructor(private service: CaptainService, private route: Router, private fb: FormBuilder) { }

  idNumber: string = "";
  name: string = "";
  email: string ="";
  phone: string = "";
  titleNumber: string = "";

  myForm: FormGroup = this.fb.group({
    idNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(9)]],
    titleNumber: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
  })

  ngOnInit(): void {
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  addCaptain() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.addCaptain(this.myForm.value.idNumber, this.myForm.value.name, this.myForm.value.email, this.myForm.value.phone, this.myForm.value.titleNumber)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Socio añadido',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/captains')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Socio no añadido',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/captains')
          }
        })
    }
  }

  goBack() {
    window.history.back();
  }
}
