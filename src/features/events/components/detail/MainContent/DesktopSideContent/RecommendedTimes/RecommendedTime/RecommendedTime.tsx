import ParticipantsDivider from '../../../../ParticipantsDivider';
import ParticipantsSection from '../../../../ParticipantsSection';
import PaticipantStatus from '../../../../PaticipantStatus';
import RecommendedTimeHeading from '../../../../RecommendedTimeHeading';
import { RecommendScheduleType } from '@/lib/types';

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
