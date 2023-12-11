import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl = 'https://restcountries.com/v3.1'; // URL base de la API

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<any[]>(url);
  }

  getCountryByName(name: string): Observable<any[]> {
    const url = `${this.baseUrl}/name/${name}`;
    return this.http.get<any[]>(url);
  }

}