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
  @Input() date: string;
  @Input() startAt: string;
  @Input() endAt: string;
  @Input() base: string;
  @Input() baseDropDown: Array<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
  }

  changeParams(date: string, base: string): void {
    this.store.dispatch(new CurrenciesActions.ChangeParams({ base, date }));
  }

  changePeriodParams(startAt: string, endAt: string, base: string): void {
    this.store.dispatch(new CurrenciesActions.ChangeHistoryParams({ base, startAt, endAt }));
  }

}
