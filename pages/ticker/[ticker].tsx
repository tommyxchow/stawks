import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import StockChart from '../../components/StockChart';
import TickerForm from '../../components/TickerForm';
import { CompanyData, CompanyLogo, StockData } from '../../types/iex';

export default function Ticker({
  ticker,
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
          <div>
            <h1 className='text-3xl font-bold'>{ticker}</h1>
            <p className='text-neutral-400 text-xl'>
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

            <div className='flex gap-20'>
              {companyData.sector && (
                <div className='space-y-2'>
                  <h3 className='uppercase tracking-wider font-medium text-sm'>
                    Sector
                  </h3>
                  <p>{companyData.sector}</p>
                </div>
              )}

              {companyData.CEO && (
                <div className='space-y-2'>
                  <h3 className='uppercase tracking-wider font-medium text-sm'>
                    CEO
                  </h3>
                  <p>{companyData.CEO}</p>
                </div>
              )}

              {companyData.employees && (
                <div className='space-y-2'>
                  <h3 className='uppercase tracking-wider font-medium text-sm'>
                    Employees
                  </h3>
                  <p>{companyData.employees}+</p>
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </Layout>
  );
}

type TickerProps = {
  ticker: string;
  logo: string;
  companyData: CompanyData;
  stockData: StockData[];
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
      logo: companyLogo.url,
      companyData,
      stockData,
    },
  };
};
