import React from 'react';
import { News } from '../types/iex';
import NewsCard from './NewsCard';

type NewsProps = {
  news: News[];
};

export default function NewsSection({ news }: NewsProps) {
  return (
    <div className='flex flex-col gap-4'>
      {news.map((article) => (
        <NewsCard key={article.headline} {...article} />
      ))}
    </div>
  );
}
