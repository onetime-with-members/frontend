import ParticipantsDivider from '../../../../shared/ParticipantsDivider';
import ParticipantsSection from '../../../../shared/ParticipantsSection';
import PaticipantStatus from '../../../../shared/PaticipantStatus';
import RecommendedTimeHeading from '../../../../shared/RecommendedTimeHeading';
import { RecommendScheduleType } from '@/features/event/types';

export default function RecommendedTime({
  recommendedTime,
}: {
  recommendedTime: RecommendScheduleType;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 p-5">
      <header className="flex items-start justify-between">
        <RecommendedTimeHeading recommendedTime={recommendedTime} />
        <PaticipantStatus
          participantCount={{
            possible: recommendedTime.possible_count,
            total:
              recommendedTime.possible_names.length +
              recommendedTime.impossible_names.length,
          }}
        />
      </header>
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
    </div>
  );
}
