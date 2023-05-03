import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { BoatsResponse } from '../interfaces/boat.interface';


@Injectable({
  providedIn: 'root'
})
export class BoatService {

constructor(private http: HttpClient) { }


url: string = 'http://localhost:9100/boats';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  getBoats(): Observable<BoatsResponse[]> {
    return this.http.get<BoatsResponse[]>(this.url, this.httpOptions);
  }

  getBoatById(id: number): Observable<BoatsResponse> {
    return this.http.get<BoatsResponse>(`${this.url}/${id}`, this.httpOptions)
  }

  
  addBoat(plate: string, name:string, slipNumber: string, fee: number, 
    idOwner: string, idCaptain: string): Observable<BoatsResponse>{
    return this.http.post<BoatsResponse>(`${this.url}`, {plate, name, slipNumber, fee, idOwner, idCaptain}, this.httpOptions);
  }
 
  deleteBoat(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  editBoat(id: number, plate: string, name:string, slipNumber: string, fee: number, 
    idOwner: string, idCaptain: string): Observable<BoatsResponse> {
    return this.http.put<BoatsResponse>(`${this.url}/${id}`, {id, plate, name, slipNumber, fee, idOwner, idCaptain}, this.httpOptions)
  }
}

