import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='icon'
          type='image/svg+xml'
          href='/assets/images/favicon.svg'
        />
        <link rel='icon' type='image/png' href='/assets/images/favicon.png' />

        <meta property='og:url' content='https://stawks.vercel.app/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='STAWKS' />
        <meta
          property='og:description'
          content='View price charts, details, and news about stocks.'
        />
        <meta
          property='og:image'
          content='https://stawks.vercel.app/ogimage.png'
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='stawks.vercel.app' />
        <meta property='twitter:url' content='https://stawks.vercel.app/' />
        <meta name='twitter:title' content='STAWKS' />
        <meta
          name='twitter:description'
          content='View price charts, details, and news about stocks.'
        />
        <meta
          name='twitter:image'
          content='https://stawks.vercel.app/ogimage.png'
        />
      </Head>
      <body className='bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
