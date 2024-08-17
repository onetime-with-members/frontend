import clsx from 'clsx';

interface TBItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  handleDialogOpen?: () => void;
}

export default function TBItem({ active, className, ...rest }: TBItemProps) {
  return (
    <div
      className={clsx(
        'h-[2rem] w-full cursor-pointer border-b border-gray-10 last:border-b-0 odd:border-dashed even:border-solid',
        className,
        {
          'bg-primary-50': active,
          'bg-gray-05': !active,
        },
      )}
      {...rest}
    />
  );
}
