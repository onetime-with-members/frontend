import ParticipantsDivider from '../../../../shared/ParticipantsDivider';
import ParticipantsSection from '../../../../shared/ParticipantsSection';
import PaticipantStatus from '../../../../shared/PaticipantStatus';
import RecommendedTimeHeading from '../../../../shared/RecommendedTimeHeading';
import { RecommendedScheduleType } from '@/features/event/models';

export default function RecommendedTime({
  recommendedTime,
}: {
  recommendedTime: RecommendedScheduleType;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 p-5">
      <header className="flex items-start justify-between">
        <RecommendedTimeHeading recommendedTime={recommendedTime} />
        <PaticipantStatus
          participantCount={{
            possible: recommendedTime.possibleCount,
            total:
              recommendedTime.possibleCount + recommendedTime.impossibleCount,
          }}
        />
      </header>
      <ParticipantsDivider />
      <div className="flex flex-col gap-5">
        <ParticipantsSection
          type="available"
          participants={recommendedTime.possibleNames}
        />
        <ParticipantsSection
          type="unavailable"
          participants={recommendedTime.impossibleNames}
        />
      </div>
    </div>
  );
}
