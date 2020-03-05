import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

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

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.currencyService.getCurrencies().subscribe(data => {
      this.baseDropDown = [];
      for (const key in data) {
        if (key === 'rates') {
          for (const curr in data[key]) {
            if (data[key].hasOwnProperty(curr)) {
              this.rates = data[key];
              this.baseDropDown.push(curr);
            }
          }
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
    });
  }

  changeBase(base) {
    const currencies = {
      date: this.date,
      base,
      rates: this.rates
    };
    this.changeBaseOrDate(currencies);
  }

  changeDate(date) {
    const currencies = {
      date,
      base: this.base,
      rates: this.rates
    };
    this.changeBaseOrDate(currencies);
  }

  changeBaseOrDate(currencies) {
    this.currencyService.getDifferent(currencies).subscribe(data => {
      this.baseDropDown = [];
      for (const key in data) {
        if (key === 'rates') {
          for (const curr in data[key]) {
            if (data[key].hasOwnProperty(curr)) {
              this.rates = data[key];
              this.baseDropDown.push(curr);
            }
          }
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
    });
  }

}
