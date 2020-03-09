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
  rates: any;
  base: any;
  startAt: any;
  endAt: any;
  errShow: boolean;
  errorText: string;
  lineChartLabels: Array<string>;
  lineChartData: Array<object>;

  constructor(private route: ActivatedRoute, private currencyService: CurrencyService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const name = params.get('name');
        return ('currency/' + name);
      })
    );

    this.name = this.router.url.split('/').pop();

    this.currencyService.getHistory(this.name).subscribe(data => {
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

  changeParam(start, end, base) {
    const currencies = {
      start_at: start,
      end_at: end,
      base,
    };
    console.log(currencies);
  }

  getChartDatas() {
    let coppyObject = Object.assign({}, this.rates);
    // Getting the keys of JavaScript Object
    let sortedObject = Object.keys(coppyObject)
    .sort().reduce(function(Obj, key) {  
        // Adding the key-value pair to the new object in sorted keys manner 
        Obj[key] = coppyObject[key];  
        return Obj;  
    }, {});

    // Loop through sorted object
    const len = Object.keys(sortedObject).length;
    let key: string;
    let labels = [];
    let values = [];
    for (let i=0; i<len; i++) {
      if (i & 2) { // Push values for even iterations only - better chart readability
        key = Object.keys(sortedObject)[i];
        labels.push(key);
        values.push(Object.values(sortedObject[key]).pop());
      }
    }
    this.lineChartLabels = labels;
    this.lineChartData = [{ data: values, label: this.name }];
  }
}
