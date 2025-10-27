import { useParticipantsQuery } from '@/features/event/api/events.query';
import { RecommendedScheduleType } from '@/features/event/models';
import { useParams } from 'next/navigation';

export default function useIsOnlyOneFiltered({
  recommendedTime,
}: {
  recommendedTime: RecommendedScheduleType;
}) {
  const params = useParams<{ id: string }>();

  const { data: participants } = useParticipantsQuery(params.id);

  return (
    participants.length > 1 &&
    recommendedTime.possibleCount === 1 &&
    recommendedTime.impossibleCount === 0
  );
}
