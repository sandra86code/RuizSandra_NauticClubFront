import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router"
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import { AuthService } from "./auth/services/auth.service";


@Injectable()
export class RolGuard implements CanActivate, CanActivateChild {
  
  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.isAdminGuard()){
      return true
    }
    else{
      this.router.navigateByUrl('')
      Swal.fire({
        icon: 'error',
        title: 'Prohibido',
        text: 'No tiene permiso para acceder a esa ruta'
      })
      return false
    }
    
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdmin
  }

}