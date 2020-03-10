import { Action } from '@ngrx/store';

export const CHANGE_PARAM = '[PARAM] Change';
export const CHANGE_DROPDOWN = '[DROPDOWN] Change';

export class ChangeParams implements Action {
    readonly type = CHANGE_PARAM;

    constructor(public payload: object) {}
}

export class ChangeDropDown implements Action {
  readonly type = CHANGE_DROPDOWN;

  constructor(public payload: object) {}
}

export type Actions = ChangeParams | ChangeDropDown;
