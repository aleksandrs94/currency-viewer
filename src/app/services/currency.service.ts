import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    return this.http.get<Currency[]>(
      `${this.currenciesUrl}/latest`
    )
    .pipe(catchError(this.errorHandler));
  }

  // getDifferentBase(base: string): Observable<Currency[]> {
  //   return this.http.get<Currency[]>(
  //     `${this.currenciesUrl}/latest?base=${base}`
  //   )
  //   .pipe(catchError(this.errorHandler));
  // }

  // getDifferentDate(date: string): Observable<Currency[]> {
  //   return this.http.get<Currency[]>(
  //     `${this.currenciesUrl}/${date}`
  //   )
  //   .pipe(catchError(this.errorHandler));
  // }

  // Get values with different base currency or different date
  getDifferent(currencies: Currency): Observable<Currency[]> {
    return this.http.get<Currency[]>(
      `${this.currenciesUrl}/${currencies.date}?base=${currencies.base}`
    )
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.error || error.message || 'Server error');
  }
}
