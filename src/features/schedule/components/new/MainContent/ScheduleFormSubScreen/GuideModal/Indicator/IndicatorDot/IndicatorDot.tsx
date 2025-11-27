import cn from '@/lib/cn';

export default function IndicatorDot({
  active,
  onClick,
}: {
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn('w-1.5 rounded-full bg-primary-10', {
        'w-6 bg-primary-50': active,
        'cursor-pointer': onClick,
      })}
    />
  );
}
