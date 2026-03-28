import { useTranslations } from 'next-intl';

import type { ConfirmedTimeVariant } from '../confirmedTimeVariant';
import cn from '@/lib/cn';

export default function ConfirmedTimeHeader({
  variant = 'default',
}: {
  variant?: ConfirmedTimeVariant;
}) {
  const t = useTranslations('event.pages.EventDetailPage.confirm');
  const isHeaderCard = variant === 'headerCard';

  return (
    <div
      className={cn(
        'flex flex-col items-start pl-1',
        isHeaderCard ? 'text-gray-50' : 'text-gray-30',
      )}
    >
      <h2 className="text-sm-100">{t('confirmedDate')}</h2>
      <div
        className={cn('my-2 h-px w-full', isHeaderCard ? 'bg-gray-10' : 'bg-gray-70')}
      />
    
    </div>
  );
}
