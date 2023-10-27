import Image from 'next/image';
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
      <article className='grid gap-4 rounded-lg bg-neutral-200 p-4 shadow-md transition hover:bg-opacity-50 active:scale-95 active:shadow-none dark:bg-neutral-800 dark:hover:bg-opacity-50 sm:grid-cols-4'>
        <div className='relative col-span-1 h-40'>
          <Image
            className='rounded-md object-cover'
            src={image}
            alt='Thumbnail'
            sizes='25vw'
            fill
          />
        </div>

        <div className='flex flex-col gap-2 sm:col-span-3'>
          <p className='text-xs font-medium text-neutral-700 dark:text-neutral-300'>
            {source}
          </p>

          <h3 className='text-lg font-semibold line-clamp-2'>{headline}</h3>

          <p className='mb-2 text-sm text-neutral-700 dark:text-neutral-300'>
            {formattedTime} • {formattedDate}
          </p>

          <p className='text-sm text-neutral-700 line-clamp-2 dark:text-neutral-300'>
            {summary}
          </p>
        </div>
      </article>
    </a>
  );
}
