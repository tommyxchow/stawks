import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getStockPriceChange } from '../lib/helper';
import { StockChartData, StockQuote } from '../types/iex';
import StockChart from './StockChart';

const ranges = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y'];

type StockChartWithPriceProps = {
  ticker: string;
  stockQuote: StockQuote;
  stockChartData: StockChartData[];
};

export default function StockChartWithPrice({
  ticker,
  stockQuote,
  stockChartData,
}: StockChartWithPriceProps) {
  const [chartRangeIndex, setChartRangeIndex] = useState(0);
  const [stockData, setStockData] = useState(stockChartData);

  const priceChange =
    chartRangeIndex == 0 ? stockQuote.change : getStockPriceChange(stockData);

  const priceChangePercent =
    chartRangeIndex == 0
      ? stockQuote.changePercent
      : stockData[stockData.length - 1].changeOverTime * 100;

  return (
    <div className='flex flex-col bg-black p-4 rounded-2xl mb-4 gap-4 shadow-xl'>
      <div>
        <div className='flex gap-2 items-center'>
          <h2 className='text-2xl font-semibold'>
            ${stockQuote.latestPrice.toFixed(2)}{' '}
          </h2>

          <p
            className={`font-medium text-lg bg-opacity-30 rounded-full px-2 ${
              priceChange > 0
                ? 'text-green-500 bg-green-700'
                : 'text-red-500 bg-red-700'
            }`}
          >
            {priceChange > 0 && '+'}
            {priceChange.toFixed(2)} ({Math.abs(priceChangePercent).toFixed(2)}
            %)
          </p>
        </div>

        <menu className='flex gap-2'>
          {ranges.map((range, index) => (
            <li key={range}>
              <button
                className={`transition font-medium ${
                  chartRangeIndex != index &&
                  'text-neutral-400 hover:text-neutral-100'
                }`}
                onClick={() => setChartRangeIndex(index)}
              >
                {range}
              </button>
            </li>
          ))}
        </menu>
      </div>

      {chartRangeIndex == 0 ? (
        <StockChart stockChartData={stockChartData} stockQuote={stockQuote} />
      ) : (
        <FetchAndRenderChart
          ticker={ticker}
          range={ranges[chartRangeIndex]}
          setStockData={setStockData}
        />
      )}
    </div>
  );
}

function FetchAndRenderChart({
  ticker,
  range,
  setStockData,
}: {
  ticker: string;
  range: string;
  setStockData: (stockData: StockChartData[]) => void;
}) {
  // Use ticker + range as key to call the fetcher every time the ticker or range changes.
  const { error, data } = useSWR(
    ticker + range,
    (): Promise<StockChartData[]> =>
      fetch(`/api/charts/${ticker}/${range}`).then((res) => res.json())
  );

  // Run a side effect that runs the setStockData callback when the data changes.
  // This is used to set the price and percent change in the parent component.
  useEffect(() => {
    // Data is potentially undefined at this point, so we need to check for it.
    if (data) setStockData(data);
  }, [data, setStockData]);

  if (error) return <p>Failed to load chart :(</p>;

  return <StockChart key={ticker} stockChartData={data ?? []} />;
}
