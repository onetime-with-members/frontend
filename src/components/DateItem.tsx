import clsx from 'clsx';

interface DateItemProps {
  children: React.ReactNode;
  active?: boolean;
}

export default function DateItem({ children, active }: DateItemProps) {
  return (
    <button
      className={clsx('h-10 w-10 rounded-lg', {
        'bg-primary-40 text-gray-00': active,
        'bg-gray-05 text-gray-30': !active,
      })}
    >
      {children}
    </button>
  );
}
