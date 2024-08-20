// import TimeAccordionItem from '../recommend-time/TimeAccordionItem';
import MemberBadge from '../MemberBadge';
import { IconX } from '@tabler/icons-react';

interface ParticipantsPopUpProps {
  onClose: () => void;
  participants: string[];
}

export default function ParticipantsPopUp({
  onClose,
  participants,
}: ParticipantsPopUpProps) {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="max-h-[30rem] min-h-[131px] w-[23rem] cursor-auto overflow-y-auto rounded-2xl bg-gray-00 px-5 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-lg-300 text-gray-80">
              스케줄을 추가한 사람들{' '}
            </h2>
            <span className="text-lg-300 text-primary-50">
              {participants.length}
            </span>
          </div>
          <button className="cursor-pointer text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          {participants.map((participant) => (
            <MemberBadge>{participant}</MemberBadge>
          ))}
        </div>
      </div>
    </div>
  );
}
