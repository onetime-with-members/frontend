import { participantsQueryOptions } from '@/lib/api/query-options';
import { RecommendScheduleType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function useIsOnlyOneFiltered({
  recommendedTime,
}: {
  recommendedTime: RecommendScheduleType;
}) {
  const params = useParams<{ id: string }>();

  const { data: participantsData } = useQuery({
    ...participantsQueryOptions(params.id),
  });

  const pariticpants = participantsData || [];

  return (
    pariticpants.length > 1 &&
    recommendedTime.possible_count === 1 &&
    recommendedTime.impossible_names.length === 0
  );
}
