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

}
