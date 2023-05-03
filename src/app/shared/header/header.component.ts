import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  
  styles: ['.nav-link{color: #143746}.button-active { color: #fff; background-color: #b08f26; border-color: #b08f26 !important} .active { color: #0c8996 !important; } .material-symbols-outlined { color: #20687b} .big-icon {font-size: 48px; }.special-inline { display: inline-block}']
})
export class HeaderComponent {

  constructor(private authService: AuthService,  private router: Router) { }

  isLoggedIn$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  
  logout() {
    this.authService.logOut();

  }
}
