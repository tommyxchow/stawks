import { StockChartData } from '../types/iex';

export const getStockPriceChange = (
  stockChartData: StockChartData[]
): number => {
  const openingPrice = stockChartData.find((data) => data.open);
  const closingPrice = stockChartData
    .slice()
    .reverse()
    .find((data) => data.close);

  return (closingPrice?.close ?? 0) - (openingPrice?.close ?? 0);
};
