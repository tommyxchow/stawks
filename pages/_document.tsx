import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-neutral-900 text-neutral-100'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
