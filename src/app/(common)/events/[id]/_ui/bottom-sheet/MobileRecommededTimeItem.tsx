import { useState } from 'react';

import {
  ParticipantsSection,
  PaticipantStatus,
  RecommendTimeHeading,
} from '../../_contents/desktop-contents';
import ParticipantsDivider from './ParticipantsDivider';
import { RecommendScheduleType } from '@/lib/types';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function MobileRecommededTimeItem({
  recommendedTime,
}: {
  recommendedTime: RecommendScheduleType;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 px-4 py-3">
      <header
        className="flex items-center justify-between gap-2"
        onClick={handleClick}
      >
        <RecommendTimeHeading recommendedTime={recommendedTime} />
        <div className="flex items-center gap-2">
          <PaticipantStatus
            participantCount={{
              possible: recommendedTime.possible_count,
              total:
                recommendedTime.possible_names.length +
                recommendedTime.impossible_names.length,
            }}
          />
          <span className="text-2xl text-gray-40">
            {isOpen ? <IconChevronUp /> : <IconChevronDown />}
          </span>
        </div>
      </header>

      {isOpen && (
        <>
          <ParticipantsDivider />
          <div className="flex flex-col gap-5">
            <ParticipantsSection
              type="available"
              participants={recommendedTime.possible_names}
            />
            <ParticipantsSection
              type="unavailable"
              participants={recommendedTime.impossible_names}
            />
          </div>
        </>
      )}
    </div>
  );
}
