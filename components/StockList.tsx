import React from 'react';
import { StockQuote } from '../types/iex';
import StockChip from './StockChip';

type StockListProps = {
  title: string;
  stocks: StockQuote[];
};

export default function StockList({ title, stocks }: StockListProps) {
  return (
    <article>
      <h2 className='mb-2 text-center text-lg font-semibold'>{title}</h2>
      <ul className='flex flex-col gap-4'>
        {stocks.slice(0, 5).map((quote) => (
          <li key={quote.symbol}>
            <StockChip quote={quote} />
          </li>
        ))}
      </ul>
    </article>
  );
}
