import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import alarmIcon from '../../../assets/alarm-icon.svg';
import { MyEvent } from '../../../types/event.type';
import { IconChevronRight } from '@tabler/icons-react';

interface MyEventItemProps {
  event: MyEvent;
}

export default function MyEventItem({ event }: MyEventItemProps) {
  return (
    <li>
      <Link
        to={`/events/${event.event_id}`}
        className="flex flex-col gap-3 rounded-2xl bg-gray-00 p-5"
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
        <div className="flex items-center justify-between rounded-lg bg-primary-00 px-4 py-3">
          <div className="flex items-center gap-2 text-primary-50 text-sm-300 xs:text-md-200 sm:text-lg-200">
            <span>
              <img src={alarmIcon} alt="알람 아이콘" />
            </span>
            <span>2024.03.01 월</span>
            <span>18:00 - 20:00</span>
          </div>
          <div>
            <IconChevronRight size={20} className="text-gray-30" />
          </div>
        </div>
      </Link>
    </li>
  );
}
