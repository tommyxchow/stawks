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
  state: string;
  city: string;
};

export type CompanyLogo = {
  url: string;
};

export type StockQuote = {
  symbol: string;
  companyName: string;
  avgTotalVolume: number;
  primaryExchange: string;
  iexOpen: number;
  iexClose: number;
  high: number;
  low: number;
  latestPrice: number;
  extendedPrice: number;
  extendedChange: number;
  extendedPriceTime: number;
  previousClose: number;
  marketCap: number;
  peRatio: number;
  week52High: number;
  week52Low: number;
  change: number;
  changePercent: number;
  isUSMarketOpen: boolean;
};

export type News = {
  datetime: string;
  headline: string;
  source: string;
  url: string;
  summary: string;
  related: string;
  image: string;
  lang: string;
  hasPaywall: boolean;
};

export type Stats = {
  ttmEPS: number;
  ttmDividendRate: number;
  dividendYield: number;
  beta: number;
  nextEarningsDate: string;
  dividentYield: number;
};
