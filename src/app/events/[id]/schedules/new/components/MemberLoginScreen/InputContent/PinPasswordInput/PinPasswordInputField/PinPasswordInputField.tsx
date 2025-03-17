import cn from '@/utils/cn';

interface PinPasswordInputItemProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef: React.Ref<HTMLInputElement>;
}

export default function PinPasswordInputField({
  inputRef,
  className,
  ...rest
}: PinPasswordInputItemProps) {
  return (
    <input
      ref={inputRef}
      className={cn(
        'rounded-xl bg-gray-05 px-5 py-4 text-center text-gray-90 outline-none text-md-200 placeholder:text-gray-30 focus:outline-2 focus:outline-primary-30',
        className,
      )}
      autoComplete="off"
      placeholder="_"
      {...rest}
    />
  );
}
