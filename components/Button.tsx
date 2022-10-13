import React from 'react';

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className='dark:bg-neutral-100 bg-neutral-900 text-neutral-100 dark:text-neutral-900 px-4 py-2 rounded-full font-semibold uppercase tracking-wider dark:hover:bg-neutral-400 hover:bg-neutral-600 shadow active:shadow-none transition active:scale-90'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};
