import { useState } from 'react';
import { getStockPriceChange } from '../lib/helper';
import { StockChartData, StockQuote } from '../types/iex';
import StockChart from './StockChart';

const ranges = ['1d', '5d', '1m', '6m', 'ytd', '1y', '5y'];

type StockChartWithPriceProps = {
  ticker: string;
  isError: boolean;
  fallback: Record<string, any>;
};

export default function StockChartWithPrice({
  ticker,
  isError,
  fallback,
}: StockChartWithPriceProps) {
  const stockQuoteData = fallback['/api/quote/aapl'] as StockQuote;

  const allStockData = ranges.map((range) => {
    const stockData = fallback[`/api/charts/aapl/${range}`] as StockChartData[];
    return stockData;
  });

  console.log(allStockData);

  const [chartRangeIndex, setChartRangeIndex] = useState(0);
  const chartRange = ranges[chartRangeIndex];
  const stockData = allStockData[chartRangeIndex];

  const priceChange =
    chartRange[chartRangeIndex] === '1d'
      ? stockQuoteData && stockQuoteData.change
      : stockData && getStockPriceChange(stockData);

  const priceChangePercent =
    chartRange === '1d'
      ? stockQuoteData && stockQuoteData.changePercent
      : stockData && stockData[stockData.length - 1].changeOverTime * 100;

  return (
    <div className='mb-4 flex flex-col gap-4 rounded-2xl p-4 shadow-lg dark:bg-black'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-2'>
          <h2 className='text-xl font-semibold dark:text-neutral-100 sm:text-2xl'>
            ${stockQuoteData?.latestPrice.toFixed(2)}
          </h2>

          {priceChange && (
            <p
              className={`rounded-full bg-opacity-30 px-2 font-medium dark:bg-opacity-20 sm:text-lg ${
                priceChange > 0
                  ? 'bg-green-400 text-green-800 dark:bg-green-700 dark:text-green-400'
                  : 'bg-red-400 text-red-800 dark:bg-red-700 dark:text-red-400'
              }`}
            >
              {priceChange > 0 && '+'}
              {priceChange.toFixed(2)} (
              {priceChangePercent && Math.abs(priceChangePercent).toFixed(2)}
              %)
            </p>
          )}
        </div>

        <menu className='flex gap-2 text-sm sm:text-base'>
          {ranges.map((range, index) => (
            <li key={range}>
              <button
                className={`font-medium transition ${
                  chartRange !== range &&
                  'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
                }`}
                onClick={() => setChartRangeIndex(index)}
              >
                {range.toUpperCase()}
              </button>
            </li>
          ))}
        </menu>
      </div>

      <FetchAndRenderChart
        ticker={ticker}
        range={chartRange}
        stockQuote={chartRange === '1d' ? stockQuoteData : undefined}
        fallbackData={stockData}
      />
    </div>
  );
}

function FetchAndRenderChart({
  ticker,
  range,
  stockQuote,
  fallbackData,
}: {
  ticker: string;
  range: string;
  stockQuote?: StockQuote;
  fallbackData?: StockChartData[];
}) {
  // // Use ticker + range as key to call the fetcher every time the ticker or range changes.
  // const { error, data } = useSWR(
  //   ticker + range,
  //   (): Promise<StockChartData[]> =>
  //     fetch(`/api/charts/${ticker}/${range}`).then((res) => res.json()),
  //   {
  //     // Only revalidate if on the 1d range.
  //     // Ranges beyond 1d are not updated in real time, so we don't need to revalidate.
  //     revalidateOnFocus: range === '1d',
  //   }
  // );

  // // Run a side effect that runs the setStockData callback when the data changes.
  // // This is used to set the price and percent change in the parent component.
  // useEffect(() => {
  //   // Data is potentially undefined at this point, so we need to check for it.
  //   if (data) setStockData(data);
  // }, [data, setStockData]);

  // if (error) return <p>Failed to load chart :(</p>;

  return (
    <StockChart
      key={ticker}
      stockChartData={fallbackData ?? []}
      stockQuote={stockQuote}
    />
  );
}
