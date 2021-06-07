import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrencyService } from '../../services/currency.service';
import { AppState } from '../../app.state';
import { Params } from '../../models/Params';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss']
})
export class CurrencyDetailComponent implements OnInit {
  currencies: Observable<Params[]>;
  name: string;
  rates: any;
  base: any;
  baseDropDown: any;
  startAt: any;
  endAt: any;
  errShow: boolean;
  errorText: string;
  lineChartLabels: Array<string>;
  lineChartData: Array<object>;
  positive: boolean;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private router: Router
  ) {
    this.currencies = this.store.select('currency');
    this.store.select('baseDropDown').subscribe(data => {
      this.baseDropDown = data[0];
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const name = params.get('name');
        return ('currency/' + name);
      })
    );
    this.getWithParams();
  }

  private getWithParams(): void {
    this.name = this.router.url.split('/').pop();
    this.currencies.subscribe(data => {
      const mappedParams = Object.assign({ name: this.name }, data[0]);
      this.fetchWithParams(mappedParams);
    });
  }

  private fetchWithParams(currencies: Params): void {
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
      this.getChartData();
    });
  }

  private getChartData() {
    const copyObject = Object.assign({}, this.rates);
    // Getting the keys of JavaScript Object
    const sortedObject = Object.keys(copyObject)
    .sort().reduce((Obj, k) => {
        // Adding the key-value pair to the new object in sorted keys manner
        Obj[k] = copyObject[k];
        return Obj;
    }, {});

    // Loop through sorted object
    const len = Object.keys(sortedObject).length;
    let key: string;
    const labels = [];
    const values = [];
    for (let i = 0; i < len; i++) {
      key = Object.keys(sortedObject)[i];
      labels.push(key);
      values.push(Object.values(sortedObject[key]).pop());
    }
    this.lineChartLabels = labels;
    this.lineChartData = [{ data: values, label: this.name }];
    this.positive = values[0] < values[values.length - 1];
  }
}
