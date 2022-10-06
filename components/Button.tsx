import React from 'react';

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className='bg-neutral-100 text-neutral-900 px-4 py-2 rounded-full font-semibold uppercase tracking-wider'
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
