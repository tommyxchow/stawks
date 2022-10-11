import React from 'react';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout title='404 | STAWKS' description='Stock or page not found'>
      <div className='min-h-screen m-auto max-w-screen-md flex justify-center items-center'>
        <h1 className='text-neutral-400'>404 - Stock or page not found</h1>
      </div>
    </Layout>
  );
}
