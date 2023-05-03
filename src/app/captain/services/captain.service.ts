import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { CaptainsResponse } from '../interfaces/captain.interface';


@Injectable({
  providedIn: 'root'
})
export class CaptainService {

constructor(private http: HttpClient) { }


url: string = 'http://localhost:9100/captains';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  getCaptains(): Observable<CaptainsResponse[]> {
    return this.http.get<CaptainsResponse[]>(this.url, this.httpOptions);
  }

  getCaptainById(id: number): Observable<CaptainsResponse> {
    return this.http.get<CaptainsResponse>(`${this.url}/${id}`, this.httpOptions)
  }

  
  addCaptain(idNumber: string, name:string, email:string, phone:string, titleNumber: string): Observable<CaptainsResponse> {
    return this.http.post<CaptainsResponse>(`${this.url}`, {"idNumber": idNumber, "name": name, "email": email, "phone": phone, titleNumber}, this.httpOptions);
  }


  deleteCaptain(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  editCaptain(id: number, idNumber: string, name: string, email: string, phone: string, 
    titleNumber: string): Observable<CaptainsResponse> {
    return this.http.put<CaptainsResponse>(`${this.url}/${id}`, {id, idNumber, name, email, phone, titleNumber}, this.httpOptions)
  }
  
}

