import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  // Method to get the list of countries
  getCountryList(): Observable<any> {
    // Using HttpClient to make a GET request to the restcountries.com API
    return this.http.get('https://restcountries.com/v3.1/name/eesti');
  }
}
