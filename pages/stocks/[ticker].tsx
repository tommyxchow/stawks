import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import StockChart from '../../components/StockChart';
import TickerForm from '../../components/TickerForm';
import { CompanyData, CompanyLogo, StockData } from '../../types/iex';

type TickerProps = {
  ticker: string;
  logoURL: string;
  companyData: CompanyData;
  stockData: StockData[];
  error: boolean;
};

export default function Ticker({
  ticker,
  logoURL,
  companyData,
  stockData,
}: TickerProps) {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  ticker = ticker.toUpperCase();

  return (
    <Layout
      title={`${ticker} | Stawks`}
      description={`Stock data for ${ticker}.`}
    >
      <div className='min-h-screen py-8 flex flex-col gap-16'>
        <TickerForm />

        <section className='flex flex-col gap-4'>
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

            <h1 className='text-3xl font-bold'>{ticker}</h1>

            <p className='text-neutral-400 text-xl self-end'>
              {companyData.companyName}
            </p>
          </div>

          <div className='bg-black p-4 rounded-2xl mb-4'>
            <StockChart stockData={stockData} />
          </div>

          <section className='space-y-8'>
            <div>
              <h2 className='text-2xl font-semibold mb-2'>About</h2>
              <p>{companyData.description}</p>
            </div>
          </section>
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

    return {
      props: {
        ticker: params?.ticker,
        logoURL: companyLogo.url,
        companyData,
        stockData,
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