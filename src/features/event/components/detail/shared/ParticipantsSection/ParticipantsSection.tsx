import { useTranslations } from 'next-intl';

import MemberBadge from '@/components/MemberBadge';
import cn from '@/lib/cn';

export default function ParticipantsSection({
  type,
  participants,
}: {
  type: 'available' | 'unavailable';
  participants: string[];
}) {
  const t = useTranslations('eventDetail');

  return (
    participants.length > 0 && (
      <div className="flex flex-col gap-2">
        <h4
          className={cn('flex items-center gap-1 text-sm-200', {
            'text-primary-60': type === 'available',
            'text-gray-40': type === 'unavailable',
          })}
        >
          {type === 'available' ? t('available') : t('unavailable')}
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {participants.map((name, index) => (
            <MemberBadge
              key={index}
              variant={type === 'available' ? 'primary' : 'gray'}
            >
              {name}
            </MemberBadge>
          ))}
        </div>
      </div>
    )
  );
}
