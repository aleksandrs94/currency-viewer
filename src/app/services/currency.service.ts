import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Currency } from '../models/Currency';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currenciesUrl = 'https://api.exchangeratesapi.io/latest';

  constructor(private http: HttpClient) { }

  // Get Currencies
  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.currenciesUrl);
  }
}
