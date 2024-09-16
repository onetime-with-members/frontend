import clsx from 'clsx';
import { useState } from 'react';

import MemberBadge from '../../badge/MemberBadge';
import ParticipantsPopUp from '../../pop-up/ParticipantsPopUp';
import { IconChevronRight } from '@tabler/icons-react';

interface ParticipantsProps {
  participants: string[];
}

export default function Participants({ participants }: ParticipantsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          <span className="text-md-300 text-gray-60">
            참여자{' '}
            <strong className="text-md-300 text-primary-50">
              {participants.length}
            </strong>
          </span>
          <IconChevronRight size={24} className="text-gray-30" />
        </div>
        <div className={clsx(style.badgeList, 'hidden min-[440px]:flex')}>
          {participants.slice(0, 9).map((participant) => (
            <MemberBadge key={participant}>{participant}</MemberBadge>
          ))}
          {participants.length > 9 && (
            <MemberBadge variant="gray" className="">
              ...
            </MemberBadge>
          )}
        </div>
        <div className={clsx(style.badgeList, 'flex min-[440px]:hidden')}>
          {participants.slice(0, 7).map((participant) => (
            <MemberBadge key={participant}>{participant}</MemberBadge>
          ))}
          {participants.length > 7 && (
            <MemberBadge variant="gray" className="">
              ...
            </MemberBadge>
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
