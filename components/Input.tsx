import React from 'react';

export default function Input({ id, placeholder }: InputProps) {
  return (
    <input
      id={id}
      className='px-4 py-2 rounded-full dark:bg-neutral-800 bg-neutral-200 w-full shadow placeholder:text-neutral-600 dark:placeholder:text-neutral-400'
      placeholder={placeholder}
      required
    ></input>
  );
}

type InputProps = {
  id: string;
  placeholder: string;
};
