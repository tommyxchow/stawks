import React from 'react';

export default function Footer() {
  return (
    <footer className='max-w-screen-md m-auto py-8 px-4 md:px-0'>
      <div className='flex flex-col gap-2 justify-center items-center text-sm text-neutral-400'>
        <p>
          Designed and developed by{' '}
          <a
            className='underline underline-offset-2'
            href='https://www.tommychow.com/'
            target='_blank'
            rel='noreferrer'
          >
            Tommy Chow
          </a>
        </p>
        <p>
          Data sourced from the{' '}
          <a
            className='underline underline-offset-2'
            href='https://iexcloud.io/docs/api/'
            target='_blank'
            rel='noreferrer'
          >
            IEX Cloud API
          </a>
        </p>
      </div>
    </footer>
  );
}
