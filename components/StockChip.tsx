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
          className={`flex gap-4 p-2 rounded-lg font-medium bg-opacity-20 justify-between hover:bg-opacity-10 active:scale-95 transition bg ${
            quote.change > 0
              ? 'text-green-500 bg-green-700'
              : 'text-red-500 bg-red-700'
          }`}
        >
          <h3>{quote.symbol}</h3>
          {quote.change && (
            <p>
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
