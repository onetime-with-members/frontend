import { useTranslations } from 'next-intl';
import Skeleton from 'react-loading-skeleton';

import {
  useParticipants,
  useParticipantsIsLoading,
} from '../../../EventDetailPage.stores';
import Header from '../Header/Header';
import MemberBadge from '@/components/MemberBadge/MemberBadge';
import SkeletonMemberBadge from '@/components/skeleton/SkeletonMemberBadge/SkeletonMemberBadge';

export default function Participants() {
  const participants = useParticipants();
  const isParticipantsLoading = useParticipantsIsLoading();

  const t = useTranslations('eventDetail');

  return (
    <div className="flex flex-col gap-1">
      <Header>
        {!isParticipantsLoading ? (
          <span className="flex items-center gap-2">
            <span>
              {t('participant', {
                count: participants.length,
              })}
            </span>
            <span className="text-primary-50">{participants.length}</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Skeleton width={100} baseColor="#e8e9ed" borderRadius={9999} />
            <Skeleton width={16} baseColor="#e8e9ed" circle />
          </span>
        )}
      </Header>
      <div className="flex flex-wrap gap-2 pb-9">
        {!isParticipantsLoading
          ? participants.map((participant, index) => (
              <MemberBadge key={index} variant="white">
                {participant}
              </MemberBadge>
            ))
          : Array.from({ length: 4 }, (_, index) => (
              <SkeletonMemberBadge key={index} baseColor="#e8e9ed" />
            ))}
      </div>
    </div>
  );
}
