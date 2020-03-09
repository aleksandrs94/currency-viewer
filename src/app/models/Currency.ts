export interface Currency {
  rates: Rates;
  base: string;
  date: string;
}

export interface Rates {
  [key: string]: number;
}
