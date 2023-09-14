export default function Input({ id, placeholder }: InputProps) {
  return (
    <input
      id={id}
      className='w-full rounded-full bg-neutral-200 px-4 py-2 shadow placeholder:text-neutral-600 dark:bg-neutral-800 dark:placeholder:text-neutral-400'
      placeholder={placeholder}
      required
    ></input>
  );
}

type InputProps = {
  id: string;
  placeholder: string;
};
