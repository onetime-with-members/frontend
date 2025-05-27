import { useTranslations } from 'next-intl';
import Skeleton from 'react-loading-skeleton';

import MemberBadge from '@/components/member-badge';
import MemberBadgeSkeleton from '@/components/skeleton/member-badge-skeleton';
import cn from '@/lib/cn';
import { SKELETON_DARK_GRAY } from '@/lib/constants';

interface ParticipantsSectionProps {
  type: 'available' | 'unavailable';
  participants: string[];
  isPending?: boolean;
}

export default function ParticipantsSection({
  type,
  participants,
  isPending,
}: ParticipantsSectionProps) {
  const t = useTranslations('eventDetail');

  return (
    (isPending || participants.length > 0) && (
      <div className="flex flex-col gap-2">
        <h4
          className={cn('flex items-center gap-1 text-md-300', {
            'text-primary-50': type === 'available',
            'text-gray-50': type === 'unavailable',
          })}
        >
          <span>
            {!isPending ? (
              type === 'available' ? (
                t('available')
              ) : (
                t('unavailable')
              )
            ) : (
              <Skeleton width={80} />
            )}
          </span>
          <span>
            {!isPending ? (
              participants.length
            ) : (
              <Skeleton width={16} height={16} circle />
            )}
          </span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {!isPending
            ? participants.map((name, index) => (
                <MemberBadge
                  key={index}
                  variant={type === 'available' ? 'primary' : 'gray'}
                >
                  {name}
                </MemberBadge>
              ))
            : Array.from({ length: 4 }, (_, index) => (
                <MemberBadgeSkeleton
                  key={index}
                  baseColor={SKELETON_DARK_GRAY}
                />
              ))}
        </div>
      </div>
    )
  );
}
