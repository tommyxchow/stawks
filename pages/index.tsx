import type { NextPage } from 'next';
import Layout from '../components/Layout';
import TickerForm from '../components/TickerForm';

const Home: NextPage = () => {
  return (
    <Layout title='Stawks' description='Stawks home.'>
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
            relevant metadata.
          </p>
        </div>

        <TickerForm />
      </div>
    </Layout>
  );
};

export default Home;

type Inputs = {
  ticker: string;
};
