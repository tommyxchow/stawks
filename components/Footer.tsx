import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className='m-auto max-w-screen-md py-8 px-4 md:px-0'>
      <div className='flex flex-col items-center justify-center gap-2 text-sm text-neutral-600 dark:text-neutral-400'>
        <p>
          Theme:{' '}
          <button
            className={resolvedTheme === 'light' ? 'underline' : undefined}
            onClick={() => setTheme('light')}
          >
            Light
          </button>{' '}
          <button
            className={resolvedTheme === 'dark' ? 'underline' : undefined}
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
        </p>

        <p>
          Designed and developed by{' '}
          <a
            className='underline'
            href='https://www.tommychow.com/'
            target='_blank'
            rel='noreferrer'
          >
            Tommy Chow
          </a>
        </p>

        <p>
          Data sourced from the{' '}
          <a
            className='underline'
            href='https://iexcloud.io/docs/api/'
            target='_blank'
            rel='noreferrer'
          >
            IEX Cloud API
          </a>
        </p>
        <p>
          View{' '}
          <a
            className='underline'
            href='https://github.com/tommyxchow/stawks'
            target='_blank'
            rel='noreferrer'
          >
            source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
