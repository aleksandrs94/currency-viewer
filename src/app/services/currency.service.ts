import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Currency } from '../models/Currency';
import { History } from '../models/History';

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
    return throwError({ reason: (error.error.error || 'Reason'), message: (error.message || 'Server error')});
  }
}
