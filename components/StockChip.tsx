import Link from 'next/link';
import React from 'react';
import { StockQuote } from '../types/iex';

type StockChipProps = {
  quote: StockQuote;
};

export default function StockChip({ quote }: StockChipProps) {
  return (
    <Link href={`/stocks/${quote.symbol}`}>
      <a>
        <article
          className={`flex justify-between gap-4 rounded-lg bg-opacity-30 p-2 font-semibold transition hover:bg-opacity-20 active:scale-95 dark:bg-opacity-20 dark:hover:bg-opacity-10 ${
            quote.change > 0
              ? 'bg-green-400 text-green-800 dark:bg-green-700 dark:text-green-400'
              : 'bg-red-400 text-red-800 dark:bg-red-700 dark:text-red-400'
          }`}
        >
          <h3>{quote.symbol}</h3>
          {quote.change && (
            <p className='text-right'>
              {quote.change > 0 && '+'}
              {quote.change.toFixed(2)} (
              {Math.abs(quote.changePercent).toFixed(2)}
              %)
            </p>
          )}
        </article>
      </a>
    </Link>
  );
}
