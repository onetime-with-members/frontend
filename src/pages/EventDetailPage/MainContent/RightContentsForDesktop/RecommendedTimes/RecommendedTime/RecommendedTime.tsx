import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import MemberBadge from '@/components/MemberBadge/MemberBadge';
import ClockIcon from '@/components/icon/ClockIcon';
import { useEventQuery } from '@/queries/event.queries';
import { RecommendScheduleType } from '@/types/schedule.type';

interface RecommendedTimeProps {
  recommendedTime: RecommendScheduleType;
}

export default function RecommendedTime({
  recommendedTime,
}: RecommendedTimeProps) {
  const params = useParams<{ eventId: string }>();

  const { data: event } = useEventQuery(params.eventId);

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-gray-00 p-5">
      <h3 className="flex items-center gap-1 text-primary-50 text-md-300">
        <span>
          <ClockIcon fill="#4c65e5" size={20} />
        </span>
        <span className="flex items-center gap-2">
          <span>
            {event && event.category === 'DATE'
              ? dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
                  'YYYY.MM.DD (dd)',
                )
              : `${recommendedTime.time_point}요일`}
          </span>
          <span>
            {recommendedTime.start_time} - {recommendedTime.end_time}
          </span>
        </span>
      </h3>
      <div className="flex flex-col gap-5">
        {recommendedTime.possible_names.length > 0 && (
          <div className="flex flex-col gap-2">
            <h4 className="flex items-center gap-1 text-primary-50 text-md-300">
              <span>가능</span>
              <span>{recommendedTime.possible_names.length}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {recommendedTime.possible_names.map((name, index) => (
                <MemberBadge key={index}>{name}</MemberBadge>
              ))}
            </div>
          </div>
        )}
        {recommendedTime.impossible_names.length > 0 && (
          <div className="flex flex-col gap-2">
            <h4 className="flex items-center gap-1 text-gray-50 text-md-300">
              <span>불가능</span>
              <span>{recommendedTime.impossible_names.length}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {recommendedTime.impossible_names.map((name, index) => (
                <MemberBadge key={index} variant="gray">
                  {name}
                </MemberBadge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
