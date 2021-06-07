import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Currency } from '../models/Currency';
import { History } from '../models/History';
import { Params } from '../models/Params';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  // Get values with different base currency or different date
  public getCurrencies(currencies: Params): Observable<Currency[]> {
    return this.http.get<Currency[]>(
      `${environment.API_ENDPOINT}/v1/${currencies.end_at}?access_key=${environment.API_KEY}&base=${currencies.base || 'EUR'}`
    )
    .pipe(catchError(this.errorHandler));
  }

  // Get historical values for particular period, currency and base currency
  public getHistory(history: Params): Observable<History[]> {
    return this.http.get<History[]>(
      `${environment.API_ENDPOINT}/v1/timeseries?access_key=${environment.API_KEY}&start_at=${history.start_at}&end_at=${history.end_at}&symbols=${history.name}&base=${history.base || 'EUR'}`
    )
    .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError({ reason: (error.error.error || 'Reason'), message: (error.message || 'Server error')});
  }
}
