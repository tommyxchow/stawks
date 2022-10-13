import Link from 'next/link';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import TickerForm from './TickerForm';

export default function Header() {
  return (
    <header className='sticky inset-0 z-50 py-8 px-4 backdrop-blur md:px-0'>
      <div className='m-auto flex max-w-screen-md items-center gap-2'>
        <Link href='/'>
          <a>
            <HiHome
              className='transition hover:text-neutral-400 active:scale-90'
              size={28}
              title='Go home'
            />
          </a>
        </Link>
        <TickerForm />
      </div>
    </header>
  );
}
