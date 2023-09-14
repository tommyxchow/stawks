import { Stats, StockQuote } from '../types/iex';

type StatsProps = {
  stockQuote: StockQuote;
  stats: Stats;
};

export default function StatsSection({ stockQuote, stats }: StatsProps) {
  const tableData1 = [
    { title: 'Previous Close', value: stockQuote.previousClose },
    { title: 'Open', value: stockQuote.iexOpen },
    { title: 'Close', value: stockQuote.iexClose },
    { title: '52 Week High', value: stockQuote.week52High },
    { title: '52 Week Low', value: stockQuote.week52Low },
    { title: 'Extended Hours Price', value: stockQuote.extendedPrice },
  ];

  const tableData2 = [
    { title: 'Dividend Yield', value: stats.dividendYield * 100 },
    { title: 'Beta', value: stats.beta },
    { title: 'P/E Ratio', value: stockQuote.peRatio },
    { title: '30-Day Average Volume', value: stockQuote.avgTotalVolume },
    { title: 'Market Cap', value: stockQuote.marketCap },
    { title: 'Next Earnings Date', value: stats.nextEarningsDate },
  ];

  return (
    <article className='grid text-right sm:grid-cols-2 sm:text-left'>
      <table className='table-fixed sm:table-auto'>
        <tbody>
          {tableData1.map((data) => (
            <tr className='border-y border-neutral-700' key={data.title}>
              <th className='py-2 text-left font-semibold'>{data.title}</th>
              <td className='text-neutral-700 dark:text-neutral-300'>
                {data.value ? data.value.toFixed(2).toLocaleString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className='table-fixed sm:table-auto'>
        <tbody>
          {tableData2.map((data) => (
            <tr className='border-y border-neutral-700' key={data.title}>
              <th className='py-2 text-left font-semibold'>{data.title}</th>
              <td className='text-neutral-700 dark:text-neutral-300'>
                {data.value ? data.value.toLocaleString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
