import { Params } from '../models/Params';
import * as CurrenciesAction from '../actions/currencies.actions';

const end = new Date();
const dd = new Date();
const start = dd.setMonth(dd.getMonth() - 12);

const initialState: Params = {
    base: 'EUR',
    start_at: formatDate(start),
    end_at: formatDate(end),
    name: ''
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

export function CurrencyReducer(state: Params[] = [initialState], action: CurrenciesAction.Actions) {
  switch (action.type) {
    case CurrenciesAction.CHANGE_PARAM:
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
