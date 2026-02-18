import SpeechBalloon from '../../../../shared/SpeechBalloon';
import { CalendarIcon } from '@/components/icon';
import {
  useConfirmEventMutation,
  useEventQuery,
  useRecommendedTimesQuery,
} from '@/features/event/api/event.query';
import { useParams } from 'next/navigation';

export default function ConfirmEventButton() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);
  const { data: recommendedTimes } = useRecommendedTimesQuery(params.id);

  const { mutateAsync: confirmEvent } = useConfirmEventMutation();

  async function handleClick() {
    if (recommendedTimes.length === 0) return;
    const recommendedTime = recommendedTimes[0];
    await confirmEvent({
      eventId: params.id,
      data:
        event.category === 'DATE'
          ? {
              start_date: recommendedTime.time_point,
              end_date: recommendedTime.time_point,
              start_time: recommendedTime.start_time,
              end_time: recommendedTime.end_time,
              selection_source: 'RECOMMENDED',
            }
          : {
              start_date: recommendedTime.time_point,
              end_date: recommendedTime.time_point,
              start_time: recommendedTime.start_time,
              end_time: recommendedTime.end_time,
              selection_source: 'RECOMMENDED',
            },
    });
  }

  return (
    <div className="hidden md:block">
      <SpeechBalloon.Container>
        <SpeechBalloon.Wrapper>
          <button
            className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-gray-00 text-md-300"
            onClick={handleClick}
          >
            <span>
              <CalendarIcon innerfill="#4c65e5" fontSize={24} />
            </span>
            <span>일정 확정하기</span>
          </button>
        </SpeechBalloon.Wrapper>
        <SpeechBalloon.Main
          width={315}
          offset={2}
          vertical="top"
          horizontal="right"
          variant="secondary"
        >
          일정 확정 후, 팀원들에게 일정 알림을 보낼 수 있어요
        </SpeechBalloon.Main>
      </SpeechBalloon.Container>
    </div>
  );
}
