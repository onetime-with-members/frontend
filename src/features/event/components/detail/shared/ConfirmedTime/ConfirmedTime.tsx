import ConfirmedTimeHeader from './ConfirmedTimeHeader';
import ConfirmedTimeMain from './ConfirmedTimeMain';
import type { ConfirmedTimeVariant } from './confirmedTimeVariant';
import cn from '@/lib/cn';

export type { ConfirmedTimeVariant } from './confirmedTimeVariant';

export default function ConfirmedTime({
  variant = 'default',
}: {
  variant?: ConfirmedTimeVariant;
}) {
  const isHeaderCard = variant === 'headerCard';

  return (
    <div
      className={cn(
        'flex w-full flex-col rounded-2xl p-3',
        isHeaderCard
          ? 'bg-gray-00 shadow-[0_2px_8px_0_rgba(49,51,63,0.08)]'
          : 'bg-gray-80',
      )}
    >
      <ConfirmedTimeHeader variant={variant} />
      <ConfirmedTimeMain variant={variant} />
    </div>
  );
}
