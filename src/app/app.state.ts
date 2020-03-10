import { Params } from './models/Params';

export interface AppState {
  readonly currency: Params[];
  readonly baseDropDown: Array<string>;
}
