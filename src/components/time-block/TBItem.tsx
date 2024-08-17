import clsx from 'clsx';

interface TBItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  editable?: boolean;
}

export default function TBItem({
  active,
  className,
  editable,
  onClick,
  ...rest
}: TBItemProps) {
  return (
    <div
      className={clsx(
        'h-[2rem] w-full border-b border-gray-10 last:border-b-0 odd:border-dashed even:border-solid',
        className,
        {
          'bg-primary-50': active,
          'bg-gray-05': !active,
          'cursor-pointer': editable,
        },
      )}
      onClick={editable ? onClick : undefined}
      {...rest}
    />
  );
}
