import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

import { DecodeToken } from '../interfaces/decode-token.interface';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    url: string = 'http://localhost:9100';

    private loggedIn;

    private admin = new BehaviorSubject<boolean>(false);



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})

  };

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
    if (this.cookieService.get("token") == "") {
      this.loggedIn.next(false);
    } else {
      this.loggedIn.next(true);
    }
  }

  

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isAdmin() {
    return this.admin.asObservable();
  }


  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.url}/signin`, { username, password }, this.httpOptions)
      .pipe(switchMap(token => {
        this.cookieService.set('token', token.body.token.replace('Bearer ', ''));
        this.loggedIn.next(true);
        return of(true);
      }), catchError(error => {
        return of(false);
      }))
  }

  logOut() {
    this.cookieService.deleteAll();
    this.loggedIn.next(false);
  }



  isAdminGuard() {
    let token = this.cookieService.get('token')
    if (token) {
      let role = this.decodeJwt(token).role
      if (role == 'ADMIN') {
        this.cookieService.set('role', 'ADMIN');
        return true
      }
    }
    return false

  }

  decodeJwt(jwt: string): DecodeToken {
    return jwt_decode(jwt)
  }
}