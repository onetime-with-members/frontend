import alarmIcon from '../../../assets/alarm-icon.svg';
import { IconChevronRight } from '@tabler/icons-react';

export default function MyEventItem() {
  return (
    <li className="flex flex-col gap-3 rounded-2xl bg-gray-00 p-5">
      <div className="flex flex-col gap-1">
        <div className="text-sm-200 flex items-center gap-1 text-gray-30">
          <span>오늘</span>
          <span>·</span>
          <span>2명</span>
        </div>
        <h1 className="text-md-300 sm:text-lg-300 overflow-hidden text-ellipsis whitespace-nowrap text-gray-80">
          원타임 정기 회의 일정, 원타임 정기 회의 원타임 정기 회의 일정, 원타임
          정기 회의
        </h1>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-primary-00 px-4 py-3">
        <div className="xs:text-md-200 sm:text-lg-200 text-sm-300 flex items-center gap-2 text-primary-50">
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
    </li>
  );
}
