import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { AppState } from '../../app.state';
import { Params } from '../../models/Params';
import * as CurrenciesActions from '../../actions/currencies.actions';
@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  currencies: Observable<Params[]>;
  rates: any;
  base: any;
  endAt: any;
  startAt: any;
  baseDropDown: Array<string>;
  errShow: boolean;
  errorText: string;

  constructor(private currencyService: CurrencyService, private store: Store<AppState>) {
    this.currencies = store.select('currency');
  }

  ngOnInit(): void {
    this.getWithParams();
  }

  private getWithParams(): void {
    this.currencies.subscribe(data => {
      this.fetchWithParams(data[0]);
    });
  }

  private fetchWithParams(currencies: Params): void {
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
          this.endAt = data[key];
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
