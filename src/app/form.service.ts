import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
//import 'rxjs/add/observable/throw';

@Injectable()
export class FormServiceNew {

  private baseUrl = environment.baseUrl;

  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  createAddress(body: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}direcciones`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Prefer': 'return=representation'
      }),
    }).pipe(catchError(this.errorHandler))
  }

  createEmployees(body: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}empleados`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Prefer': 'return=representation'
      }),
    }).pipe(catchError(this.errorHandler))
  }

  editAddress(body: any, id: string): Observable<Object> {
    return this.http.patch(`${this.baseUrl}direcciones?id=eq.${id}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Prefer': 'return=representation'
      }),
    }).pipe(catchError(this.errorHandler))
  }

  editEmployees(body: any, id: string): Observable<Object> {
    return this.http.patch(`${this.baseUrl}empleados?id=eq.${id}`, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Prefer': 'return=representation'
      }),
    }).pipe(catchError(this.errorHandler))
  }

  getInitials(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}empleados?id=eq.${id}&select=*,direcciones(id,nombre_departamento,nombre_municipio,ubicacion)`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': this.apiKey,
        'Authorization': `Bearer ${this.apiKey}`,
        'Prefer': 'return=representation'
      }),
    }).pipe(catchError(this.errorHandler))
  }

  getDepartamentos(): Observable<Object> {
    return this.http.get(`https://api.salud.gob.sv/departamentos?idPais=68`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(catchError(this.errorHandler))
  }
  getDepartamentosOnly(id: string): Observable<Object> {
    return this.http.get(`https://api.salud.gob.sv/departamentos/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(catchError(this.errorHandler))
  }
  getMunicipios(id: string): Observable<Object> {
    return this.http.get(`https://api.salud.gob.sv/municipios?idDepartamento=${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
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