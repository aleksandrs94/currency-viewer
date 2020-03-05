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
  currenciesUrl = 'https://api.exchangeratesapi.io';

  constructor(private http: HttpClient) { }

  // Get Currencies
  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.currenciesUrl}/latest`);
  }

  // getDifferentBase(base: string): Observable<Currency[]> {
  //   return this.http.get<Currency[]>(`${this.currenciesUrl}/latest?base=${base}`);
  // }

  // getDifferentDate(date: string): Observable<Currency[]> {
  //   return this.http.get<Currency[]>(`${this.currenciesUrl}/${date}`);
  // }

  // Get values with different base currency or different date
  getDifferent(currencies: Currency): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${this.currenciesUrl}/${currencies.date}?base=${currencies.base}`);
  }
}
