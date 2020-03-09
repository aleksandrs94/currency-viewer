import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/models/Currency';
@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  rates: any;
  base: any;
  date: any;
  baseDropDown: Array<string>;
  errShow: boolean;
  errorText: string;
  loading: boolean;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.currencyService.getCurrencies().subscribe(data => {
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

  getWithParams(params: object): void {
    this.loading = true;
    let date: string;
    let base: string;
    for (const key in params) {
      if (key === 'date') {
        date = params[key];
      } else if (key === 'base') {
        base = params[key];
      }
    }
    const currencies = {
      date,
      base,
      rates: this.rates
    };
    this.fetchWithParams(currencies);
  }

  fetchWithParams(currencies: Currency): void {
    this.currencyService.getDifferent(currencies).subscribe(data => {
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
          // console.log(this.baseDropDown);
          // console.log(this.rates);
        } else if (key === 'date') {
          this.date = data[key];
        } else if (key === 'base') {
          this.base = data[key];
        }
      }
      this.loading = false;
    }, error => {
      this.errShow = true;
      this.errorText = error;
    });
  }

}
