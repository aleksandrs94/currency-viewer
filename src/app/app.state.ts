import { Currency } from './models/Currency';
import { History } from './models/History';

export interface AppState {
  readonly currency: Currency[];
  readonly history: History[];
  readonly baseDropDown: Array<string>;
}
