import { News } from '../types/iex';
import NewsCard from './NewsCard';

type NewsProps = {
  news: News[];
};

export default function NewsSection({ news }: NewsProps) {
  if (news.length === 0) {
    return <p className='text-neutral-400'>News not available</p>;
  }

  return (
    <div className='flex flex-col gap-4'>
      {news.map((article) => (
        <NewsCard key={article.headline} {...article} />
      ))}
    </div>
  );
}
