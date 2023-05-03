import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BoatService } from '../services/boat.service';
import { CaptainService } from 'src/app/captain/services/captain.service';
import { MemberService } from 'src/app/member/services/member.service';

@Component({
  selector: 'app-boat-add',
  templateUrl: './boat-add.component.html'
})
export class BoatAddComponent implements OnInit {
  
  constructor(private service: BoatService, private route: Router, private fb: FormBuilder, private captainService: CaptainService,
    private memberService: MemberService) { }

  
  owners!: any;
  captains!: any;
  captainsNoBoat: any = [];

  myForm: FormGroup = this.fb.group({
    plate: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    slipNumber: ['', [Validators.required]],
    fee: ['', [Validators.required, Validators.min(0.01), Validators.max(20000)]],
    idOwner: ['', [Validators.required]],
    idCaptain: ['', [Validators.required]]
  })


  ngOnInit(): void {
    this.getCaptains();
    this.getOwners();
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  addBoat() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.addBoat(this.myForm.value.plate, this.myForm.value.name, 
        this.myForm.value.slipNumber, this.myForm.value.fee, this.myForm.value.idOwner, this.myForm.value.idCaptain)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Barco añadido',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/boats')
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Socio no añadido',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/boats')
          }
        })
    }
  }

  goBack() {
    window.history.back();
  }

  getCaptains() {
    this.captainService.getCaptains()
    .subscribe({
      next: (data) => {
        this.captains = data;
        this.captainsNoBoat = this.captains.filter((c: { boatId: number; }) => c.boatId ==-1)
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

  getOwners() {
    this.memberService.getMembers()
    .subscribe({
      next: (data) => {
        this.owners = data;
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
}


