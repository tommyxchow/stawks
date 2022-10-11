import Link from 'next/link';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import TickerForm from './TickerForm';

export default function Header() {
  return (
    <header className='max-w-screen-md m-auto py-8 px-4 md:px-0'>
      <div className='flex items-center gap-2'>
        <Link href='/'>
          <a>
            <HiHome
              className='active:scale-90 hover:text-neutral-400 transition'
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
