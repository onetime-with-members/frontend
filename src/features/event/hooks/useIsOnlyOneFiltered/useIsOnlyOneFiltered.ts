import { useParticipantsQuery } from '@/features/event/api/event.query';
import { RecommendedScheduleType } from '@/features/event/types';
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
    recommendedTime.possible_count === 1 &&
    recommendedTime.impossible_names.length === 0
  );
}
