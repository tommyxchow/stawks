import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import StockChart from '../../components/StockChart';
import TickerForm from '../../components/TickerForm';
import {
  CompanyData,
  CompanyLogo,
  PreviousDayPrice,
  StockData,
} from '../../types/iex';
import { HiHome } from 'react-icons/hi';
import Link from 'next/link';

type TickerProps = {
  ticker: string;
  logoURL: string;
  companyData: CompanyData;
  stockData: StockData[];
  previousDayPrice: PreviousDayPrice;
};

export default function Ticker({
  ticker,
  logoURL,
  companyData,
  stockData,
  previousDayPrice,
}: TickerProps) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  const stockTicker = ticker.toUpperCase();
  const currentPrice = stockData
    .slice()
    .reverse()
    .find((data) => data.close)?.close;

  const priceChange =
    (currentPrice ?? previousDayPrice.close) - previousDayPrice.close;
  const percentageChange = (priceChange / previousDayPrice.close) * 100;

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
                className='active:scale-90 hover:opacity-50 transition'
                size={28}
                title='Go home'
              />
            </a>
          </Link>
          <TickerForm />
        </div>

        <section className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-8 relative'>
                <Image
                  className='object-contain p-1 rounded-full bg-neutral-100'
                  src={logoURL}
                  alt='Logo'
                  fill
                  priority
                />
              </div>

              <h1 className='text-3xl font-bold'>{stockTicker}</h1>

              <p className='text-neutral-400 font-medium text-xl self-end'>
                {companyData.companyName}
              </p>
            </div>

            <div className='flex gap-2 items-end'>
              <h2 className='text-2xl font-semibold'>
                ${currentPrice?.toFixed(2)}{' '}
              </h2>

              <p
                className={`font-medium text-lg ${
                  priceChange > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {priceChange > 0 && '+'}
                {priceChange.toFixed(2)} (
                {Math.abs(percentageChange).toFixed(2)}%)
              </p>
            </div>
          </div>

          <div className='bg-black p-4 rounded-2xl mb-4'>
            <StockChart
              stockData={stockData}
              previousDayPrice={previousDayPrice}
            />
          </div>

          {companyData.description && (
            <section className='space-y-8'>
              <div>
                <h2 className='text-2xl font-semibold mb-2'>About</h2>
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

    const stockData: StockData[] = await fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/chart/1d?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    const previousDayPrice: PreviousDayPrice = await fetch(
      `https://cloud.iexapis.com/stable/stock/${params?.ticker}/previous?token=${process.env.IEX_TOKEN}`
    ).then((res) => res.json());

    return {
      props: {
        ticker: params?.ticker,
        logoURL: companyLogo.url,
        companyData,
        stockData,
        previousDayPrice,
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
