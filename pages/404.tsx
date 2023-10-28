import fs from 'fs';
import { GetStaticProps } from 'next';
import path from 'path';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';
import Layout from '../components/Layout';
import Ticker, { TickerProps } from './stocks/[ticker]';

export default function Custom404(tickerProps: TickerProps) {
  return (
    <Layout title='404 | STAWKS' description='Stock or page not found'>
      {/* <div className='m-auto flex min-h-screen max-w-screen-md items-center justify-center'>
        <h1 className='text-neutral-600 dark:text-neutral-400'>
          404 - Stock or page not found
        </h1>
      </div> */}

      <div className='p-4 dark:bg-red-950 bg-opacity-50 dark:bg-opacity-50 rounded-lg flex items-center gap-4 border bg-red-300 border-red-400 border-opacity-50 dark:border-red-900 dark:border-opacity-50'>
        <HiOutlineExclamationCircle size={24} className='shrink-0' />
        <p>
          If you see this, I reached the free tier API limits. The paid tier
          isn&apos;t worth it for this side project, so here&apos;s a demo with
          older data.
        </p>
      </div>

      <Ticker {...tickerProps} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const fileNames = [
    '1d.json',
    '5d.json',
    '1m.json',
    '6m.json',
    'ytd.json',
    '1y.json',
    '5y.json',
    'company_data.json',
    'logo.json',
    'news.json',
    'quote.json',
    'stats.json',
  ];

  const [
    stockChartDataDay,
    stockChartDataFiveDay,
    stockChatDataOneMonth,
    stockChartDataSixMonths,
    stockChartDataYearToDay,
    stockChartDataOneYear,
    stockChartDataFiveYear,
    companyData,
    logo,
    news,
    stockQuote,
    stats,
  ] = fileNames.map((fileName) => {
    const filePath = path.join(process.cwd(), 'data/aapl', fileName);
    const jsonString = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonString);
  });

  return {
    props: {
      ticker: 'AAPL',
      logoURL: logo.url,
      companyData,
      stockQuote,
      stats,
      news,
      isError: true,
      fallback: {
        '/api/quote/aapl': stockQuote,
        '/api/charts/aapl/1d': stockChartDataDay,
        '/api/charts/aapl/5d': stockChartDataFiveDay,
        '/api/charts/aapl/1m': stockChatDataOneMonth,
        '/api/charts/aapl/6m': stockChartDataSixMonths,
        '/api/charts/aapl/ytd': stockChartDataYearToDay,
        '/api/charts/aapl/1y': stockChartDataOneYear,
        '/api/charts/aapl/5y': stockChartDataFiveYear,
      },
    },
  };
};
