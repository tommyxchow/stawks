import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiHome } from 'react-icons/hi';
import Layout from '../../components/Layout';
import StockChartWithPrice from '../../components/StockChartWithPrice';
import TickerForm from '../../components/TickerForm';
import {
  CompanyData,
  CompanyLogo,
  StockChartData,
  StockQuote,
} from '../../types/iex';

type TickerProps = {
  ticker: string;
  logoURL: string;
  companyData: CompanyData;
  stockChartDataDay: StockChartData[];
  stockQuote: StockQuote;
};

export default function Ticker({
  ticker,
  logoURL,
  companyData,
  stockChartDataDay,
  stockQuote,
}: TickerProps) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  const stockTicker = ticker.toUpperCase();

  return (
    <Layout
      title={`${stockTicker} (${companyData.companyName}) | STAWKS`}
      description={`Stock data for ${stockTicker}.`}
    >
      <div className='min-h-screen py-8 flex flex-col gap-16'>
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <a>
              <HiHome
                className='active:scale-90 hover:text-neutral-400 transition'
                size={28}
                title='Go home'
              />
            </a>
          </Link>
          <TickerForm />
        </div>

        <section className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <div className='h-6 w-6 sm:h-8 sm:w-8 relative'>
              <Image
                className='object-contain p-1 rounded-full bg-neutral-100'
                src={logoURL}
                alt='Logo'
                fill
                priority
              />
            </div>

            <h1 className='text-2xl sm:text-3xl font-bold truncate'>
              {stockTicker}{' '}
              <span className='text-neutral-400 font-medium text-lg sm:text-xl self-end'>
                {companyData.companyName}
              </span>
            </h1>
          </div>

          <StockChartWithPrice
            ticker={ticker}
            stockQuote={stockQuote}
            stockChartData={stockChartDataDay}
          />

          {companyData.description && (
            <section className='space-y-8'>
              <div>
                <h2 className='text-xl sm:text-2xl font-semibold mb-2'>
                  About
                </h2>
                <p>{companyData.description}</p>
              </div>
            </section>
          )}
        </section>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const companyData: CompanyData = await fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/company?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const companyLogo: CompanyLogo = await fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/logo?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const stockChartDataDay: StockChartData[] = await fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/chart/1d?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const stockQuote: StockQuote = await fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/quote?displayPercent=true&token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    return {
      props: {
        ticker: params?.ticker,
        logoURL: companyLogo.url,
        companyData,
        stockChartDataDay,
        stockQuote,
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
