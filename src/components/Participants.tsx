import { useState } from 'react';

import MemberBadge from './MemberBadge';
import ParticipantsPopUp from './dialog/ParticipantsPopUp';
import { IconChevronRight } from '@tabler/icons-react';

export default function Participants() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <div
        className="min-w-[85%] cursor-pointer rounded-2xl bg-gray-00 px-4 py-5"
        onClick={handleDialogOpen}
      >
        <div className="ml-1 flex items-center justify-between">
          <span className="text-md-300 text-gray-60">
            참여자 <strong className="text-md-300 text-primary-50">8</strong>
          </span>
          <IconChevronRight size={24} className="text-gray-30" />
        </div>
        <div className="mt-2 flex flex-wrap gap-x-1 gap-y-2">
          <MemberBadge>닉네임</MemberBadge>
          <MemberBadge>닉네임</MemberBadge>
          <MemberBadge>닉네임</MemberBadge>
          <MemberBadge>닉네임</MemberBadge>
          <MemberBadge>닉네임</MemberBadge>
          <MemberBadge>닉네임</MemberBadge>
          <MemberBadge>닉네임</MemberBadge>
          <MemberBadge className="hidden min-[440px]:block">닉네임</MemberBadge>
          <MemberBadge className="hidden min-[440px]:block">닉네임</MemberBadge>
          <MemberBadge variant="gray">...</MemberBadge>
        </div>
      </div>
      {isDialogOpen && <ParticipantsPopUp onClose={handleDialogClose} />}
    </>
  );
}
