import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Currency } from '../models/Currency';
import { History } from '../models/History';

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

  // Get values with different base currency or different date
  getCurrencies(currencies: Currency): Observable<Currency[]> {
    return this.http.get<Currency[]>(
      `${this.currenciesUrl}/${currencies.date}?base=${currencies.base}`
    )
    .pipe(catchError(this.errorHandler));
  }

  // Get historical values for particular period, currency and base currency
  getHistory(history: any): Observable<History[]> {
    return this.http.get<History[]>(
      `${this.currenciesUrl}/history?start_at=${history.start_at}&end_at=${history.end_at}&symbols=${history.name}&base=${history.base}`
    )
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error.error || error.message || 'Server error');
  }
}
