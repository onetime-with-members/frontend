import cn from '@/lib/cn';

export default function PinPasswordInputField({
  inputRef,
  className,
  ...props
}: {
  inputRef: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      ref={inputRef}
      className={cn(
        'rounded-xl bg-gray-05 px-5 py-4 text-center text-gray-90 outline-none text-md-200 placeholder:text-gray-30 focus:outline-2 focus:outline-primary-30',
        className,
      )}
      autoComplete="off"
      placeholder="_"
      {...props}
    />
  );
}
