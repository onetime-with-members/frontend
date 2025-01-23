import dayjs from 'dayjs';

import { TimeBlockPopUpData } from '../../types/schedule.type';
import MemberBadge from '../MemberBadge';
import cn from '@/utils/cn';
import { IconX } from '@tabler/icons-react';

interface TimeBlockPopUpProps {
  onClose: () => void;
  timePoint: TimeBlockPopUpData['timePoint'];
  time: TimeBlockPopUpData['time'];
  members: TimeBlockPopUpData['members'];
  category: 'DAY' | 'DATE';
}

export default function TimeBlockPopUp({
  onClose,
  timePoint,
  time,
  members,
  category,
}: TimeBlockPopUpProps) {
  const startTime = time;
  let endTime = dayjs(time, 'HH:mm').add(30, 'minute').format('HH:mm');
  endTime = endTime === '00:00' ? '24:00' : endTime;

  const style = {
    title: 'text-md-300',
    memberBadgeList: 'flex mt-2 flex-wrap gap-2',
  };

  return (
    <div className="fixed left-0 top-[4.5rem] z-50 flex w-full justify-center px-4">
      <div
        className="w-full max-w-screen-sm overflow-hidden rounded-2xl bg-gray-00 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-primary-50 px-5 pb-3 pt-4">
          <div className="text-gray-00 text-lg-300">
            <span>
              {category === 'DATE'
                ? dayjs(timePoint, 'YYYY.MM.DD').format('YYYY.MM.DD (dd)')
                : `${timePoint}요일`}
            </span>
            <span className="ml-2">
              {startTime} - {endTime}
            </span>
          </div>
          <button className="text-primary-10" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-5 px-5 pb-6 pt-4">
          {members.possible.length > 0 && (
            <div>
              <h3 className={cn(style.title, 'text-primary-60')}>가능</h3>
              <div className={style.memberBadgeList}>
                {members.possible.map((member) => (
                  <MemberBadge key={member}>{member}</MemberBadge>
                ))}
              </div>
            </div>
          )}
          {members.impossible.length > 0 && (
            <div>
              <h3 className={cn(style.title, 'text-gray-50')}>불가능</h3>
              <div className={style.memberBadgeList}>
                {members.impossible.map((member) => (
                  <MemberBadge key={member} variant="gray">
                    {member}
                  </MemberBadge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
