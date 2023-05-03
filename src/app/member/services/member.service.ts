import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of, Observable, switchMap, catchError } from 'rxjs';
import { MembersResponse } from '../interfaces/member.interface';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

constructor(private http: HttpClient) { }


url: string = 'http://localhost:9100/members';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  getMembers(): Observable<MembersResponse[]> {
    return this.http.get<MembersResponse[]>(this.url, this.httpOptions);
  }

  getMemberById(id: number): Observable<MembersResponse> {
    return this.http.get<MembersResponse>(`${this.url}/${id}`, this.httpOptions)
  }

  
  addMember(idNumber: string, name:string, email:string, phone:string): Observable<MembersResponse> {
    return this.http.post<MembersResponse>(`${this.url}`, {"idNumber": idNumber, "name": name, "email": email, "phone": phone}, this.httpOptions);
  }

  deleteMember(id: number): Observable<boolean> {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions)
      .pipe(switchMap(resp => {
        return of(true);
      }), catchError(error => {
        return of(false);
      })
      )
  }

  editMember(id: number, idNumber: string, name:string, email:string, phone:string): Observable<MembersResponse> {
    return this.http.put<MembersResponse>(`${this.url}/${id}`, {"idNumber": idNumber, "name": name, "email": email, "phone": phone}, this.httpOptions)
  }
  
}
