import { useTranslation } from 'react-i18next';

import MemberBadge from '@/components/MemberBadge/MemberBadge';
import { IconX } from '@tabler/icons-react';

interface ParticipantsPopUpProps {
  onClose: () => void;
  participants: string[];
}

export default function ParticipantsPopUp({
  onClose,
  participants,
}: ParticipantsPopUpProps) {
  const { t } = useTranslation();

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[30rem] min-h-[131px] w-[23rem] cursor-auto overflow-y-auto rounded-2xl bg-gray-00 px-5 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-gray-80 text-lg-300">
              {t('eventDetail.peopleWhoAddedSchedules', {
                count: participants.length,
              })}
            </h2>
            <span className="text-primary-50 text-lg-300">
              {participants.length}
            </span>
          </div>
          <button className="cursor-pointer text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          {participants.map((participant, index) => (
            <MemberBadge key={index}>{participant}</MemberBadge>
          ))}
        </div>
      </div>
    </div>
  );
}
