import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiHome } from 'react-icons/hi';
import { SWRConfig } from 'swr';
import AboutSection from '../../components/AboutSection';
import Layout from '../../components/Layout';
import NewsSection from '../../components/NewsSection';
import StatsSection from '../../components/StatsSection';
import StockChartWithPrice from '../../components/StockChartWithPrice';
import TickerForm from '../../components/TickerForm';
import {
  CompanyData,
  CompanyLogo,
  News,
  Stats,
  StockChartData,
  StockQuote,
} from '../../types/iex';

type TickerProps = {
  ticker: string;
  logoURL: string;
  stockQuote: StockQuote;
  stats: Stats;
  companyData: CompanyData;
  news: News[];
  fallback: [key: string, value: any];
};

export default function Ticker({
  ticker,
  logoURL,
  companyData,
  stockQuote,
  stats,
  fallback,
  news,
}: TickerProps) {
  const { isFallback } = useRouter();

  const sections = [
    {
      title: 'Stats',
      component: <StatsSection stockQuote={stockQuote} stats={stats} />,
    },
    { title: 'About', component: <AboutSection companyData={companyData} /> },
    { title: 'News', component: <NewsSection news={news} /> },
  ];

  if (isFallback) {
    return (
      <Layout
        title='Loading... | STAWKS'
        description={`Loading stock details.`}
      >
        <div className='m-auto flex min-h-screen max-w-screen-md items-center justify-center'>
          <h1 className='text-neutral-600 dark:text-neutral-400'>Loading...</h1>
        </div>
      </Layout>
    );
  }

  const stockTicker = ticker.toUpperCase();

  return (
    <Layout
      title={`${stockTicker} (${companyData.companyName}) | STAWKS`}
      description={`Stock details for ${stockTicker}.`}
    >
      <div className='min-h-screen space-y-8 py-8'>
        <section className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <div className='relative h-6 w-6 shrink-0 sm:h-8 sm:w-8'>
              <Image
                className='rounded-full bg-neutral-100 object-contain p-1'
                src={logoURL}
                alt='Logo'
                sizes='32px'
                fill
                priority
              />
            </div>

            <h1 className='truncate text-2xl font-bold sm:text-3xl'>
              {stockTicker}{' '}
              <span className='self-end text-lg font-medium text-neutral-600 dark:text-neutral-400 sm:text-xl'>
                {companyData.companyName}
              </span>
            </h1>
          </div>

          <SWRConfig value={{ fallback }}>
            <StockChartWithPrice ticker={ticker} />
          </SWRConfig>
        </section>

        <div className='space-y-16'>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className='mb-2 text-xl font-semibold sm:text-2xl'>
                {section.title}
              </h2>

              {section.component}
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const companyDataPromise: Promise<CompanyData> = fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/company?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const companyLogoPromise: Promise<CompanyLogo> = fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/logo?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const stockChartDataDayPromise: Promise<StockChartData[]> = fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/chart/1d?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const stockQuotPromisee: Promise<StockQuote> = fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/quote?displayPercent=true&token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const statsPromise: Promise<Stats> = fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/stats?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const newsPromise: Promise<News[]> = fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/news/last/5?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const [
      companyData,
      companyLogo,
      stockChartDataDay,
      stockQuote,
      stats,
      news,
    ] = await Promise.all([
      companyDataPromise,
      companyLogoPromise,
      stockChartDataDayPromise,
      stockQuotPromisee,
      statsPromise,
      newsPromise,
    ]);

    return {
      props: {
        ticker: params?.ticker,
        logoURL: companyLogo.url,
        stockQuote,
        stats,
        companyData,
        news,
        // Define fallback data for useSWR.
        // This will allow us to utilize both SSG and CSR.
        fallback: {
          [`/api/quote/${params?.ticker}`]: stockQuote,
          [`/api/charts/${params?.ticker}/1d`]: stockChartDataDay,
        },
      },
      // Revalidate every minute to keep the stock data up to date.
      revalidate: 60,
    };
  } catch {
    // If there's an error (e.g., the ticker doesn't exist), return the 404 page.
    return {
      notFound: true,
    };
  }
};
