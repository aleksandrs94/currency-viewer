import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CurrencyService } from 'src/app/services/currency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent implements OnInit {
  name: string;
  date: any;
  rates: any;
  base: any;
  baseDropDown: Array<string>;
  startAt: any;
  endAt: any;
  errShow: boolean;
  errorText: string;
  lineChartLabels: Array<string>;
  lineChartData: Array<object>;
  positive: boolean;

  constructor(private route: ActivatedRoute, private currencyService: CurrencyService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const name = params.get('name');
        return ('currency/' + name);
      })
    );

    this.base = history.state.base || 'EUR';
    this.baseDropDown = history.state.baseDropDown;
    this.date = history.state.date || this.formatDate(new Date());
    this.name = this.router.url.split('/').pop();

    const d = new Date(this.date);
    d.setMonth(d.getMonth() - 12);

    const currencies = {
      start_at: this.formatDate(d),
      end_at: this.date,
      base: this.base,
      name: this.name
    };

    this.fetchWithParams(currencies);
  }

  getWithParams(params: object): void {
    let startAt: string;
    let endAt: string;
    let base: string;
    for (const key in params) {
      if (key === 'startAt') {
        startAt = params[key];
      } else if (key === 'endAt') {
        endAt = params[key];
      } else if (key === 'base') {
        base = params[key];
      }
    }
    const currencies = {
      start_at: startAt,
      end_at: endAt,
      base,
      name: this.name
    };
    this.fetchWithParams(currencies);
  }

  fetchWithParams(currencies: object): void {
    this.currencyService.getHistory(currencies).subscribe(data => {
      this.errShow = false;
      for (const key in data) {
        if (key === 'rates') {
          this.rates = data[key];
        } else if (key === 'start_at') {
          this.startAt = data[key];
        } else if (key === 'end_at') {
          this.endAt = data[key];
        } else if (key === 'base') {
          this.base = data[key];
        }
      }
    }, error => {
      this.errShow = true;
      this.errorText = error;
    }, () => {
      this.getChartDatas();
    });
  }

  formatDate(date: Date | string) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  getChartDatas() {
    const coppyObject = Object.assign({}, this.rates);
    // Getting the keys of JavaScript Object
    const sortedObject = Object.keys(coppyObject)
    .sort().reduce((Obj, k) => {
        // Adding the key-value pair to the new object in sorted keys manner
        Obj[k] = coppyObject[k];
        return Obj;
    }, {});

    // Loop through sorted object
    const len = Object.keys(sortedObject).length;
    let key: string;
    const labels = [];
    const values = [];
    for (let i = 0; i < len; i++) {
      // if (i & 2) { // Push values for even iterations only - better chart readability
        key = Object.keys(sortedObject)[i];
        labels.push(key);
        values.push(Object.values(sortedObject[key]).pop());
      // }
    }
    this.lineChartLabels = labels;
    this.lineChartData = [{ data: values, label: this.name }];
    this.positive = values[0] < values[values.length - 1];
  }
}
