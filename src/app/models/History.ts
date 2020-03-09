export interface History {
  rates: Rates;
  start_at: string;
  base: string;
  end_at: string;
}

export interface Rates {
  [key: string]: Currency;
}

export interface Currency {
  [key: string]: number;
}
