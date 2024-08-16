// import TimeAccordionItem from '../recommend-time/TimeAccordionItem';
import MemberBadge from '../MemberBadge';
import { IconX } from '@tabler/icons-react';

interface ParticipantsDialogProps {
  onClose: () => void;
}

export default function ParticipantsDialog({
  onClose,
}: ParticipantsDialogProps) {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="max-h-[30rem] w-[23rem] cursor-auto overflow-y-auto rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="text-lg-300 text-gray-80">스케줄을 추가한 사람들</h2>
          <button className="cursor-pointer text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-8 px-5 pb-7 pt-4">
          <div className="flex flex-wrap gap-3">
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
            <MemberBadge>닉네임</MemberBadge>
          </div>
        </div>
      </div>
    </div>
  );
}
