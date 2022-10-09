export type StockChartData = {
  date: string;
  minute: string;
  label: string;
  high: number;
  low: number;
  open: number;
  close: number;
  average: number;
  volume: number;
  notional: number;
  numberOfTrades: number;
  changeOverTime: number;
};

export type CompanyData = {
  symbol: string;
  companyName: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
  CEO: string;
  securityName: string;
  employees: number;
  sector: string;
  country: string;
};

export type CompanyLogo = {
  url: string;
};

export type StockQuote = {
  latestPrice: number;
  change: number;
  changePercent: number;
};
