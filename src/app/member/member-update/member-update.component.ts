import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MemberService } from '../services/member.service';


@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styles: ['.material-symbols-outlined {font-size: 50px; color: white} .back {font-size: 3rem; color: #5e1f5d; } .back:hover{ cursor: pointer;}']
})
export class MemberUpdateComponent implements OnInit {
  constructor(private service: MemberService, private route: Router, private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  idNumber: string = "";
  name: string = "";
  email: string = "";
  phone: string = "";

  id: any;

  member!: any;

  myForm: FormGroup = this.fb.group({
    idNumber: [this.idNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    name: [this.name, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: [this.email, [Validators.required, Validators.email]],
    phone: [this.phone, [Validators.required, Validators.minLength(9)]]
  })

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getMemberById(this.id)
      .subscribe({
        next: res => {
          this. member = res;
          this.myForm.setValue({
            idNumber: this.member.idNumber,
            name: this.member.name,
            email: this.member.email,
            phone: this.member.phone
          })
        }
      })
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  editMember() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.editMember(this.member.id, this.myForm.value.idNumber, this.myForm.value.name, this.myForm.value.email, this.myForm.value.phone)
        .subscribe({
          next: (resp) => {
            console.log(resp)
            Swal.fire({
              icon: 'success',
              title: 'Socio editado',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/members')
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
              Swal.fire({
                icon: 'error',
                title: message,
                confirmButtonColor: '#8d448b'
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Socio no editado',
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
}