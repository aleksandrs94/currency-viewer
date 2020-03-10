import { Currency } from '../models/Currency';
import { History } from '../models/History';
import * as CurrenciesAction from '../actions/currencies.actions';

const dd = new Date();

const initialState: Currency = {
    base: 'EUR',
    date: formatDate(dd),
    rates: {}
};

const copy = new Date();
const start = copy.setMonth(copy.getMonth() - 12);

const initialHState: History = {
    base: 'EUR',
    start_at: formatDate(start),
    end_at: formatDate(dd),
    rates: {}
};

function formatDate(date: Date | string | number) {
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

export function CurrencyReducer(state: Currency[] = [initialState], action: CurrenciesAction.Actions) {
  switch (action.type) {
    case CurrenciesAction.CHANGE_PARAM:
      return [action.payload];
    default:
      return state;
  }
}

export function HistoryReducer(state: History[] = [initialHState], action: CurrenciesAction.Actions) {
  switch (action.type) {
    case CurrenciesAction.CHANGE_HISTORY:
      return [action.payload];
    default:
      return state;
  }
}

export function DropReducer(state: Array<string> = [], action: CurrenciesAction.Actions) {
  switch (action.type) {
    case CurrenciesAction.CHANGE_DROPDOWN:
      return [action.payload];
    default:
      return state;
  }
}
