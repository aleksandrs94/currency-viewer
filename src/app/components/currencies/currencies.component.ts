import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Currency } from 'src/app/models/Currency';
import * as CurrenciesActions from '../../actions/currencies.actions';
@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  currencies: Observable<Currency[]>;
  rates: any;
  base: any;
  date: any;
  baseDropDown: Array<string>;
  errShow: boolean;
  errorText: string;

  constructor(private currencyService: CurrencyService, private store: Store<AppState>) {
    this.currencies = store.select('currency');
  }

  ngOnInit(): void {
    this.getWithParams();
  }

  getWithParams(): void {
    this.currencies.subscribe(data => {
      this.fetchWithParams(data[0]);
    });
  }

  fetchWithParams(currencies: Currency): void {
    this.currencyService.getCurrencies(currencies).subscribe(data => {
      this.errShow = false;
      this.baseDropDown = [];
      for (const key in data) {
        if (key === 'rates') {
          this.rates = data[key];
          this.baseDropDown = Object.keys(data[key]);
          if (!this.baseDropDown.includes(this.base)) {
            this.baseDropDown.push(this.base || 'EUR');
          }
          this.baseDropDown.sort();
          this.store.dispatch(new CurrenciesActions.ChangeDropDown(this.baseDropDown));
          // console.log(this.baseDropDown);
          // console.log(this.rates);
        } else if (key === 'date') {
          this.date = data[key];
        } else if (key === 'base') {
          this.base = data[key];
        }
      }
    }, error => {
      this.errShow = true;
      this.errorText = error;
    });
  }

}
