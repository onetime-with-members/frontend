import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import MemberBadge from '@/components/MemberBadge';
import { TimeBlockPopUpContext } from '@/features/schedule/contexts/TimeBlockPopUpContext';
import cn from '@/lib/cn';

export default function MemberBadgeList({
  type,
}: {
  type: 'possible' | 'impossible';
}) {
  const {
    popUpData: { members },
  } = useContext(TimeBlockPopUpContext);

  const t = useTranslations('eventDetail');

  const filteredMembers =
    type === 'possible' ? members.possible : members.impossible;

  return (
    filteredMembers.length > 0 && (
      <div>
        <h3
          className={cn('text-primary-60 text-md-300', {
            'text-gray-50': type === 'impossible',
          })}
        >
          {type === 'possible' ? t('available') : t('unavailable')}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {filteredMembers.map((member, index) => (
            <MemberBadge
              key={index}
              variant={type === 'possible' ? 'primary' : 'gray'}
            >
              {member}
            </MemberBadge>
          ))}
        </div>
      </div>
    )
  );
}
