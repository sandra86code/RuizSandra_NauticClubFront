import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BoatService } from '../services/boat.service';
import { CaptainService } from 'src/app/captain/services/captain.service';
import { MemberService } from 'src/app/member/services/member.service';
import { BoatsResponse } from '../interfaces/boat.interface';

@Component({
  selector: 'app-boat-update',
  templateUrl: './boat-update.component.html'
})
export class BoatUpdateComponent implements OnInit {
  
  constructor(private service: BoatService, private route: Router, private fb: FormBuilder, private captainService: CaptainService,
    private memberService: MemberService, private activatedRoute: ActivatedRoute) { }

  id!: any;
  owners!: any;
  captains!: any;
  boat!: BoatsResponse;
  captainsNoBoat: any = [];

  plate: string = '';
 name: string = '';
  slipNumber: string = '';
  fee: number = 0.0;
  idOwner: any;
  idCaptain: any;

  myForm: FormGroup = this.fb.group({
    id: [this.id, [Validators.required]],
    plate: [this.plate, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    slipNumber: ['', [Validators.required]],
    fee: ['', [Validators.required, Validators.min(0.01), Validators.max(20000)]],
    idOwner: ['', [Validators.required]],
    idCaptain: ['', [Validators.required]]
  })


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getBoatById(parseInt(this.id))
      .subscribe({
        next: res => {
          this.boat = res;
          this.myForm.setValue({
            id: this.boat.id,
            plate: this.boat.plate,
            name: this.boat.name,
            slipNumber: this.boat.slipNumber,
            fee: this.boat.fee,
            idOwner: this.boat.idOwner,
            idCaptain: this.boat.idCaptain
          })
        }
      })
    this.getCaptains();
    this.getOwners();
  }

  notValid(field: string): boolean {
    return this.myForm?.controls[field]?.invalid && this.myForm?.controls[field]?.touched
  }

  updateBoat() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
    }
    else {
      this.service.editBoat(this.myForm.value.id, this.myForm.value.plate, this.myForm.value.name, 
        this.myForm.value.slipNumber, this.myForm.value.fee, this.myForm.value.idOwner, this.myForm.value.idCaptain)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Barco modificado',
              confirmButtonColor: '#8d448b'
            })
            this.route.navigateByUrl('/boats')
          },
          error: (error) => {
            if(error.status === 400){
              let message = "";
              if(error.error.includes('constraint [plate]')) {
                message = 'Pruebe otra matrícula'
              }
              if(error.error.includes('constraint [slip_number]')) {
                message = 'Pruebe otro número de amarre'
              }
              Swal.fire({
                icon: 'error',
                title: message,
                confirmButtonColor: '#8d448b'
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Barco no editado',
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

  getCaptains() {
    this.captainService.getCaptains()
    .subscribe({
      next: (data) => {
        this.captains = data;
        this.captainsNoBoat = this.captains.filter((c: { boatId: number; id: number}) => c.boatId ==-1 || c.id == this.boat.idCaptain);
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