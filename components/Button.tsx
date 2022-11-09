import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className='rounded-full bg-neutral-900 px-4 py-2 font-semibold uppercase tracking-wider text-neutral-100 shadow transition hover:bg-neutral-600 active:scale-90 active:shadow-none dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-400'
      onClick={onClick}
    >
      {children}
    </button>
  );
}
