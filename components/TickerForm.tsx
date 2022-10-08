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
    <form className='flex items-center gap-2 w-full' onSubmit={handleSubmit}>
      <Input id='ticker' placeholder='Enter a ticker (e.g., AAPL)' />

      <Button>Go</Button>
    </form>
  );
}
