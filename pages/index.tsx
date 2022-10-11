import type { GetStaticProps, NextPage } from 'next';
import Layout from '../components/Layout';
import StockList from '../components/StockList';
import TickerForm from '../components/TickerForm';
import { StockQuote } from '../types/iex';

type HomeProps = {
  mostActive: StockQuote[];
  gainers: StockQuote[];
  losers: StockQuote[];
};

const Home: NextPage<HomeProps> = ({
  mostActive,
  gainers,
  losers,
}: HomeProps) => {
  const listTitles = ['Most Active', 'Gainers', 'Losers'];

  return (
    <Layout title='STAWKS' description='STAWKS home.'>
      <div className='flex flex-col gap-8 justify-center min-h-screen py-8'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl font-bold uppercase tracking-wider'>
            Stawks{' '}
            <span className='text-base tracking-normal normal-case font-normal'>
              by Tommy Chow
            </span>
          </h1>

          <p className='text-neutral-400'>
            A lightweight web app for viewing any stock&apos;s price and
            relevant details.
          </p>
        </div>

        <TickerForm />

        <div className='grid sm:grid-cols-3 gap-4 mt-4'>
          {[mostActive, gainers, losers].map((stocks, index) => (
            <StockList key={index} title={listTitles[index]} stocks={stocks} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const listTypes = ['mostactive', 'gainers', 'losers'];
  const [mostActive, gainers, losers] = await Promise.all<StockQuote>(
    listTypes.map((type) =>
      fetch(
        `https://cloud.iexapis.com/stable/stock/market/list/${type}?listLimit=6&displayPercent=true&token=${process.env.IEX_TOKEN}`
      ).then((res) => res.json())
    )
  );

  return {
    props: {
      mostActive,
      gainers,
      losers,
    },
  };
};
