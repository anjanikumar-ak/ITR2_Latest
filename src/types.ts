export interface Investment {
  stock_code: string;
  investment_type: 'espp' | 'RSU';
  stock_quantity: number;
  stock_price: string;
  investment_date: string;
}

export interface ComputedInvestment {
  stock_code: string;
  investment_type: 'espp' | 'RSU';
  stock_quantity: number;
  stock_price: string;
  investment_date: string;
  investment_value_INR: number;
  investment_value_USD: number;
  peak_date: string | null;
  peak_price: number | null;
  peak_value_INR: number;
  peak_value_USD: number;
  total_dividend_INR: number;
  total_dividend_USD: number;
}