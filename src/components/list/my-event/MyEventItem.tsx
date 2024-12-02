import clsx from 'clsx';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import alarmIcon from '../../../assets/alarm-icon.svg';
import { MyEvent } from '../../../types/event.type';
import { IconChevronRight } from '@tabler/icons-react';

interface MyEventItemProps {
  event: MyEvent;
}

export default function MyEventItem({ event }: MyEventItemProps) {
  const isRecommended =
    event.most_possible_times.length > 0 && event.participant_count >= 1;

  const recommendedTime = event.most_possible_times[0];

  return (
    <li>
      <Link
        to={`/events/${event.event_id}`}
        className="flex flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 p-5"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-gray-30 text-sm-200">
            <span>{dayjs(event.created_date).fromNow()}</span>
            <span>·</span>
            <span>{event.participant_count}명</span>
          </div>
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-80 text-md-300 sm:text-lg-300">
            {event.title}
          </h1>
        </div>
        <div
          className={clsx(
            'flex items-center justify-between rounded-lg px-4 py-3',
            {
              'bg-primary-00': isRecommended,
              'bg-gray-05': !isRecommended,
            },
          )}
        >
          <div
            className={clsx(
              'flex items-center gap-2 text-sm-200 xs:text-md-200 sm:text-lg-200',
              {
                'text-primary-50': isRecommended,
                'text-gray-40': !isRecommended,
              },
            )}
          >
            {isRecommended ? (
              recommendedTime && (
                <>
                  <span>
                    <img src={alarmIcon} alt="알람 아이콘" />
                  </span>
                  {event.category === 'DATE' ? (
                    <span>
                      {dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
                        'YYYY.MM.DD (dd)',
                      )}
                    </span>
                  ) : (
                    <span>{recommendedTime.time_point}요일</span>
                  )}
                  <span>
                    {recommendedTime.start_time} - {recommendedTime.end_time}
                  </span>
                </>
              )
            ) : (
              <span>아무도 스케줄을 등록하지 않았어요.</span>
            )}
          </div>
          <div>
            <IconChevronRight
              size={20}
              className={clsx({
                'text-primary-20': isRecommended,
                'text-gray-30': !isRecommended,
              })}
            />
          </div>
        </div>
      </Link>
    </li>
  );
}
