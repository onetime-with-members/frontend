import clsx from 'clsx';

interface PinPasswordInputItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.Ref<HTMLInputElement>;
}

export default function PinPasswordInputField({
  inputRef,
  className,
  autoComplete,
  ...rest
}: PinPasswordInputItemProps) {
  return (
    <input
      ref={inputRef}
      className={clsx(
        'title-md-100 flex-1 rounded-xl bg-gray-05 px-5 py-4 text-center outline-none',
        className,
      )}
      autoComplete="off"
      {...rest}
    />
  );
}
