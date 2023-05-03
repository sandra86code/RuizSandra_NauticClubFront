import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { DeparturesResponse } from '../interfaces/departure.interface';


@Injectable({
  providedIn: 'root'
})
export class DepartureService {

constructor(private http: HttpClient) { }


url: string = 'http://localhost:9100/departures';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  getDepartures(): Observable<DeparturesResponse[]> {
    return this.http.get<DeparturesResponse[]>(this.url, this.httpOptions);
  }

  getDepartureById(id: string): Observable<DeparturesResponse> {
    return this.http.get<DeparturesResponse>(`${this.url}/${id}`, this.httpOptions)
  }

  
  addDeparture(departureDate: Date, destination: string, boatId: number): Observable<DeparturesResponse>{
    return this.http.post<DeparturesResponse>(`${this.url}`, {departureDate, destination, boatId}, this.httpOptions);
  }

  deleteDeparture(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  editDeparture(id: number, departureDate: Date, destination: string, boatId: number): Observable<boolean> {
    return this.http.put<any>(`${this.url}/${id}`, {id, departureDate, destination, boatId}, this.httpOptions)
    .pipe( switchMap(resp => {
      return of(true);
    }),catchError(error => {
        return of(false);
    })
    )
  }
  
}

