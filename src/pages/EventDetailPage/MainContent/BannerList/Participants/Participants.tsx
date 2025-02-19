import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ParticipantsPopUp from './ParticipantsPopUp/ParticipantsPopUp';
import MemberBadge from '@/components/MemberBadge/MemberBadge';
import { useParticipants } from '@/pages/EventDetailPage/EventDetailPage.store';
import cn from '@/utils/cn';
import { IconChevronRight } from '@tabler/icons-react';

export default function Participants() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const participants = useParticipants();

  const { t } = useTranslation();

  const style = {
    badgeList: 'mt-2 flex-wrap gap-x-1 gap-y-2',
  };

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <div
        className="min-w-[85%] cursor-pointer snap-start rounded-2xl bg-gray-00 px-4 py-5"
        onClick={handleDialogOpen}
      >
        <div className="ml-1 flex items-center justify-between">
          <span className="text-gray-60 text-md-300">
            {t('eventDetail.participant', {
              count: participants.length,
            })}{' '}
            <strong className="text-primary-50 text-md-300">
              {participants.length}
            </strong>
          </span>
          <IconChevronRight size={24} className="text-gray-30" />
        </div>
        <div className={cn(style.badgeList, 'hidden min-[440px]:flex')}>
          {participants.slice(0, 9).map((participant, index) => (
            <MemberBadge key={index}>{participant}</MemberBadge>
          ))}
          {participants.length > 9 && (
            <MemberBadge variant="gray">...</MemberBadge>
          )}
        </div>
        <div className={cn(style.badgeList, 'flex min-[440px]:hidden')}>
          {participants.slice(0, 7).map((participant, index) => (
            <MemberBadge key={index}>{participant}</MemberBadge>
          ))}
          {participants.length > 7 && (
            <MemberBadge variant="gray">...</MemberBadge>
          )}
        </div>
      </div>
      {isDialogOpen && (
        <ParticipantsPopUp
          onClose={handleDialogClose}
          participants={participants}
        />
      )}
    </>
  );
}
