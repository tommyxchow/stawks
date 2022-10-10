import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getStockPriceChange } from '../lib/helper';
import { StockChartData, StockQuote } from '../types/iex';
import StockChart from './StockChart';

const ranges = ['1d', '5d', '1m', '6m', 'ytd', '1y', '5y'];

type StockChartWithPriceProps = {
  ticker: string;
};

export default function StockChartWithPrice({
  ticker,
}: StockChartWithPriceProps) {
  const { data: stockQuoteData } = useSWR(
    `/api/quote/${ticker}`,
    (): Promise<StockQuote> =>
      fetch(`/api/quote/${ticker}`).then((res) => res.json())
  );

  const { data: initialStockChartData } = useSWR(
    `/api/charts/${ticker}/1d`,
    (): Promise<StockChartData[]> =>
      fetch(`/api/charts/${ticker}/1d`).then((res) => res.json())
  );

  const [chartRange, setChartRange] = useState(ranges[0]);
  const [stockData, setStockData] = useState(initialStockChartData);

  const priceChange =
    chartRange === '1d'
      ? stockQuoteData && stockQuoteData.change
      : stockData && getStockPriceChange(stockData);

  const priceChangePercent =
    chartRange === '1d'
      ? stockQuoteData && stockQuoteData.changePercent
      : stockData && stockData[stockData.length - 1].changeOverTime * 100;

  return (
    <div className='flex flex-col bg-black p-4 rounded-2xl mb-4 gap-4 shadow-xl'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-xl sm:text-2xl font-semibold'>
            ${stockQuoteData?.latestPrice.toFixed(2)}
          </h2>

          {priceChange && (
            <p
              className={`font-medium sm:text-lg bg-opacity-30 rounded-full px-2 ${
                priceChange > 0
                  ? 'text-green-500 bg-green-700'
                  : 'text-red-500 bg-red-700'
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
          {ranges.map((range) => (
            <li key={range}>
              <button
                className={`transition font-medium ${
                  chartRange !== range &&
                  'text-neutral-400 hover:text-neutral-100'
                }`}
                onClick={() => setChartRange(range)}
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
        setStockData={setStockData}
        stockQuote={chartRange === '1d' ? stockQuoteData : undefined}
      />
    </div>
  );
}

function FetchAndRenderChart({
  ticker,
  range,
  setStockData,
  stockQuote,
}: {
  ticker: string;
  range: string;
  setStockData: (stockData: StockChartData[]) => void;
  stockQuote?: StockQuote;
}) {
  // Use ticker + range as key to call the fetcher every time the ticker or range changes.
  const { error, data } = useSWR(
    ticker + range,
    (): Promise<StockChartData[]> =>
      fetch(`/api/charts/${ticker}/${range}`).then((res) => res.json()),
    {
      // Only revalidate if on the 1d range.
      // Ranges beyond 1d are not updated in real time, so we don't need to revalidate.
      revalidateOnFocus: range === '1d',
    }
  );

  // Run a side effect that runs the setStockData callback when the data changes.
  // This is used to set the price and percent change in the parent component.
  useEffect(() => {
    // Data is potentially undefined at this point, so we need to check for it.
    if (data) setStockData(data);
  }, [data, setStockData]);

  if (error) return <p>Failed to load chart :(</p>;

  return (
    <StockChart
      key={ticker}
      stockChartData={data ?? []}
      stockQuote={stockQuote}
    />
  );
}
