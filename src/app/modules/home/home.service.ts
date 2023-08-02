import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
//import 'rxjs/add/observable/throw';

@Injectable()
export class HomeService {

  private baseUrl = environment.baseUrl;

  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  getEmployeesTotal(): Observable<Object> {
    return this.http.get(`${this.baseUrl}empleados?select=*`, {
        headers: new HttpHeaders({
            'apikey': this.apiKey,
            'Authorization': `Bearer ${this.apiKey}`,
        }),
    }).pipe(catchError(this.errorHandler))
  }
  getEmployees(filter: any, inicio: number, fin: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}empleados?limit=${inicio}&offset=${fin}&order=created_at.desc&select=*,direcciones(*)${filter}`, {
        headers: new HttpHeaders({
            'apikey': this.apiKey,
            'Authorization': `Bearer ${this.apiKey}`,
        }),
    }).pipe(catchError(this.errorHandler))
  }

  deleteEmployee(id: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}empleados?id=eq.${id}`, {
        headers: new HttpHeaders({
            'apikey': this.apiKey,
            'Authorization': `Bearer ${this.apiKey}`
        }),
    }).pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(Swal.fire({
      title: 'Error in the form',
      text: 'Try again',
      icon: 'error',
      confirmButtonText: 'Ok'
    }));
  }

}