export interface History {
  success: boolean;
  timeseries: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: Rates;
}

export interface Rates {
  [date: string]: Currency;
}

export interface Currency {
  [key: string]: number;
}
