import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ title, description, children }: LayoutProps) => {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      {pathname !== '/' && <Header />}

      <main className='m-auto max-w-screen-md px-4 md:px-0'>{children}</main>

      <Footer />
    </>
  );
};

interface LayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default Layout;
