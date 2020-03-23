import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as CurrenciesActions from '../../actions/currencies.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() startAt: string;
  @Input() endAt: string;
  @Input() base: string;
  @Input() baseDropDown: Array<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  changeParams(startAt: string, endAt: string, base: string): void {
    // Block should be replaced
    if (!startAt) {
      const dd = new Date(endAt) || new Date();
      const start = dd.setMonth(dd.getMonth() - 12);
      const d = new Date(start);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) {
          month = '0' + month;
      }
      if (day.length < 2) {
          day = '0' + day;
      }
      startAt = [year, month, day].join('-');
    }
    // Block should be replaced
    this.store.dispatch(new CurrenciesActions.ChangeParams({ base, start_at: startAt, end_at: endAt }));
  }

}
