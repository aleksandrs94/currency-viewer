export interface Currency {
  success: boolean,
  historical: boolean,
  date: string;
  timestamp: number,
  base: string;
  rates: Rates;
}

export interface Rates {
  [key: string]: number;
}
