import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  
  isLoggedIn$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  @ViewChild('loginForm') loginForm!: NgForm;

  initForm = {
    username: "",
    password: ""
  }

  notValid(campo: string): boolean {
    return this.loginForm?.controls[campo]?.invalid &&
      this.loginForm?.controls[campo]?.touched
  }

  async login() {
    this.authService.login(this.loginForm.controls["username"].value, this.loginForm.controls["password"].value)
      .subscribe({
        next: (resp) => {
          if (resp) {
            if(this.authService.isAdminGuard()) {
              this.router.navigate(['/members']);
            }else {
              this.router.navigate(['/']);
            }
          }
          else {
            this.initForm.username = '';
            this.initForm.password = '';
            this.loginForm.reset();
            Swal.fire({
              icon: 'error',
              title: 'Inicio de sesión incorrecto',
              confirmButtonColor: '#8d448b'
            })
            this.router.navigate(['/']);
          }
        }
      })
    }

  }
