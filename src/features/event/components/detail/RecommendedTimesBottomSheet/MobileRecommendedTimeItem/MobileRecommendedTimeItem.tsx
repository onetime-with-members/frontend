import { useState } from 'react';

import ParticipantsDivider from '@/features/event/components/detail/shared/ParticipantsDivider';
import ParticipantsSection from '@/features/event/components/detail/shared/ParticipantsSection';
import PaticipantStatus from '@/features/event/components/detail/shared/PaticipantStatus';
import RecommendedTimeHeading from '@/features/event/components/detail/shared/RecommendedTimeHeading';
import { RecommendScheduleType } from '@/features/event/models';
import useIsOnlyOneFiltered from '@/hooks/useIsOnlyOneFiltered';
import cn from '@/lib/cn';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function MobileRecommendedTimeItem({
  recommendedTime,
}: {
  recommendedTime: RecommendScheduleType;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const isOnlyOneFiltered = useIsOnlyOneFiltered({ recommendedTime });

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
        <RecommendedTimeHeading recommendedTime={recommendedTime} />
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
