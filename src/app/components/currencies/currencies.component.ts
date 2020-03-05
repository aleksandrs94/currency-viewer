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

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {

    this.currencyService.getCurrencies().subscribe(data => {
      for (const key in data) {
        if (key === 'rates') {
          for (const curr in data[key]) {
            if (data[key].hasOwnProperty(curr)) {
              this.rates = data[key];
            }
          }
          console.log(this.rates);
        } else if (key === 'date') {
          this.date = data[key];
        } else if (key === 'base') {
          this.base = data[key];
        }
      }
    });
  }

}
