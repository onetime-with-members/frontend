import { useState } from 'react';

import {
  ParticipantsSection,
  PaticipantStatus,
  RecommendTimeHeading,
} from '../../_contents/desktop-contents';
import ParticipantsDivider from '../ParticipantsDivider';
import cn from '@/lib/cn';
import { RecommendScheduleType } from '@/lib/types';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function MobileRecommendedTimeItem({
  recommendedTime,
}: {
  recommendedTime: RecommendScheduleType;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const isOnlyOneFiltered =
    recommendedTime.possible_count === 1 &&
    recommendedTime.impossible_names.length === 0;

  function handleClick() {
    if (!isOnlyOneFiltered) setIsOpen((prev) => !prev);
  }

  return (
    <div
      className={cn(
        'flex cursor-pointer flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 px-4 py-3',
        {
          'cursor-default': isOnlyOneFiltered,
        },
      )}
    >
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
          {!isOnlyOneFiltered && (
            <span className="text-2xl text-gray-40">
              {isOpen ? <IconChevronUp /> : <IconChevronDown />}
            </span>
          )}
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
