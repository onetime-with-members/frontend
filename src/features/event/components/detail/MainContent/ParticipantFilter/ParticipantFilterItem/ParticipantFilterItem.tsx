import cn from '@/lib/cn';

export default function ParticipantFilterItem({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <li
      className={cn(
        'cursor-pointer rounded-lg border border-gray-20 bg-gray-00 px-2.5 py-1 text-gray-40 text-sm-100',
        {
          'border-gray-70 bg-gray-70 text-gray-00': active,
        },
      )}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
