import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MemberService } from '../services/member.service';


@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html'
})
export class MemberAddComponent implements OnInit{

  constructor(private service: MemberService, private route: Router, private fb: FormBuilder) { }

  idNumber: string = "";
  name: string = "";
  email: string ="";
  phone: string = "";

  myForm: FormGroup = this.fb.group({
    idNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(9)]]
  })

  ngOnInit(): void {
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  addMember() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.addMember(this.myForm.value.idNumber, this.myForm.value.name, this.myForm.value.email, this.myForm.value.phone)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Socio añadido',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/members')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Socio no añadido',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/members')
          }
        })
    }
  }

  goBack() {
    window.history.back();
  }
}
