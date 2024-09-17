import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.Ref<HTMLInputElement>;
  inputClassName?: string;
}

export default function Input({
  className,
  value,
  inputClassName,
  inputRef,
  ...rest
}: InputProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-4 rounded-xl bg-gray-05',
        className,
      )}
    >
      <input
        ref={inputRef}
        className={clsx(
          'flex-1 bg-transparent px-5 py-4 text-gray-70 outline-none placeholder:text-gray-30',
          inputClassName,
        )}
        value={value}
        autoComplete="off"
        {...rest}
      />
    </div>
  );
}
