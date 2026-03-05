import cn from '@/lib/cn';

export default function RoundedTriangle({
  variant,
  triangleOffset,
  horizontal,
  vertical,
}: {
  variant: 'primary' | 'secondary';
  vertical: 'top' | 'bottom';
  horizontal: 'right' | 'left' | 'center';
  triangleOffset: number | undefined;
}) {
  return (
    <div
      className={cn('absolute', {
        '-translate-y-full': vertical === 'bottom',
        'left-1/2 -translate-x-1/2': horizontal === 'center' || !triangleOffset,
        'text-primary-50': variant === 'primary',
        'text-gray-00': variant === 'secondary',
      })}
      style={{
        ...(triangleOffset
          ? horizontal === 'right'
            ? { right: triangleOffset }
            : horizontal === 'left'
              ? { left: triangleOffset }
              : {}
          : {}),
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={8}
        height={6}
        viewBox="0 0 8 6"
        fill="none"
        className={cn({ 'rotate-180': vertical === 'bottom' })}
      >
        <path
          d="M8 0H0L3.16795 4.75192C3.56377 5.34566 4.43623 5.34566 4.83205 4.75192L8 0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
