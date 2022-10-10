import Head from 'next/head';
import React from 'react';

const Layout = ({ title, description, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <main className='max-w-screen-md m-auto px-4 md:px-0'>{children}</main>
    </>
  );
};

interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default Layout;
