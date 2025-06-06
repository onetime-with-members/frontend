import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { useParticipants } from '../../../EventDetailPage.stores';
import ParticipantsPopUp from './ParticipantsPopUp/ParticipantsPopUp';
import MemberBadge from '@/components/MemberBadge/MemberBadge';
import SkeletonMemberBadge from '@/components/skeleton/SkeletonMemberBadge/SkeletonMemberBadge';
import useClientWidth from '@/hooks/useClientWidth';
import { SKELETON_DARK_GRAY, SKELETON_GRAY } from '@/lib/constants';
import { IconChevronRight } from '@tabler/icons-react';

export default function Participants({ isPending }: { isPending?: boolean }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const participants = useParticipants();
  const clientWidth = useClientWidth();
  const t = useTranslations('eventDetail');

  const shownMemberBadgesCount = clientWidth >= 440 ? 9 : 7;

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <div
        className="flex min-w-[85%] cursor-pointer snap-start flex-col gap-2 rounded-2xl bg-gray-00 px-4 py-5"
        onClick={handleDialogOpen}
        style={{
          ...(isPending && {
            backgroundColor: SKELETON_GRAY,
          }),
        }}
      >
        <div className="ml-1 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="text-gray-60 text-md-300">
              {!isPending ? (
                t('participant', {
                  count: participants.length,
                })
              ) : (
                <Skeleton width={150} height={20} />
              )}
            </span>
            <strong className="text-primary-50 text-md-300">
              {!isPending ? (
                participants.length
              ) : (
                <Skeleton width={20} height={20} />
              )}
            </strong>
          </span>
          {!isPending ? (
            <IconChevronRight size={24} className="text-gray-30" />
          ) : (
            <Skeleton width={20} height={20} />
          )}
        </div>

        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {!isPending ? (
            <>
              {participants
                .slice(0, shownMemberBadgesCount)
                .map((participant, index) => (
                  <MemberBadge key={index}>{participant}</MemberBadge>
                ))}
              {participants.length > shownMemberBadgesCount && (
                <MemberBadge variant="gray">...</MemberBadge>
              )}
            </>
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonMemberBadge key={index} />
            ))
          )}
        </div>
      </div>

      {isDialogOpen && (
        <ParticipantsPopUp
          onClose={handleDialogClose}
          participants={participants}
        />
      )}
    </SkeletonTheme>
  );
}
