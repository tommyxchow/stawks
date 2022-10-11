import Image from 'next/future/image';
import React from 'react';
import { News } from '../types/iex';

export default function NewsCard({
  datetime,
  headline,
  url,
  summary,
  image,
  source,
}: News) {
  const date = new Date(datetime);
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <a href={url} target='_blank' rel='noreferrer'>
      <article className='p-4 bg-neutral-800 rounded-lg grid items-center sm:grid-cols-4 gap-4 hover:bg-opacity-50 transition active:scale-95'>
        <div className='relative col-span-1 h-40'>
          <Image
            className='object-cover rounded-md'
            src={image}
            alt='Thumbnail'
            sizes='25vw'
            fill
            priority
          />
        </div>

        <div className='sm:col-span-3 flex flex-col gap-2'>
          <p className='text-xs text-neutral-300 font-medium'>{source}</p>

          <h3 className='text-lg font-semibold line-clamp-2'>{headline}</h3>

          <p className='text-neutral-300 text-sm mb-2'>
            {formattedTime} • {formattedDate}
          </p>

          <p className='text-neutral-300 line-clamp-2 text-sm'>{summary}</p>
        </div>
      </article>
    </a>
  );
}
