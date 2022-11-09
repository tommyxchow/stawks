import { useRouter } from 'next/router';
import React from 'react';
import Button from './Button';
import Input from './Input';

export default function TickerForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ticker = e.currentTarget.ticker.value;
    router.push(`/stocks/${ticker}`);
  };

  return (
    <form className='flex w-full items-center gap-2' onSubmit={handleSubmit}>
      <Input id='ticker' placeholder='Enter a stock ticker' />

      <div className='hidden sm:block'>
        <Button>Go</Button>
      </div>
    </form>
  );
}
