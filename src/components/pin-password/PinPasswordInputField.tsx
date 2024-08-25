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
        'title-md-200 rounded-xl bg-gray-05 px-5 py-4 text-center outline-none placeholder:text-gray-30',
        className,
      )}
      autoComplete="off"
      placeholder="_"
      {...rest}
    />
  );
}
