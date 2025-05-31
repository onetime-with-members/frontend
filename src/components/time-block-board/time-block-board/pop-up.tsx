import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

import MemberBadge from '@/components/member-badge';
import cn from '@/lib/cn';
import { weekdaysShortKo } from '@/lib/constants';
import { TimeBlockPopUpDataType } from '@/lib/types';
import { IconX } from '@tabler/icons-react';

export default function TimeBlockPopUp({
  onClose,
  timePoint,
  time,
  members,
  category,
}: {
  onClose: () => void;
  timePoint: TimeBlockPopUpDataType['timePoint'];
  time: TimeBlockPopUpDataType['time'];
  members: TimeBlockPopUpDataType['members'];
  category: 'DAY' | 'DATE';
}) {
  const t = useTranslations('eventDetail');

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
                ? dayjs(timePoint, 'YYYY.MM.DD').format('YYYY.MM.DD (ddd)')
                : dayjs()
                    .day(
                      weekdaysShortKo.findIndex(
                        (weekday) => weekday === timePoint,
                      ),
                    )
                    .format('dddd')}
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
              <h3 className={cn(style.title, 'text-primary-60')}>
                {t('available')}
              </h3>
              <div className={style.memberBadgeList}>
                {members.possible.map((member, index) => (
                  <MemberBadge key={index}>{member}</MemberBadge>
                ))}
              </div>
            </div>
          )}
          {members.impossible.length > 0 && (
            <div>
              <h3 className={cn(style.title, 'text-gray-50')}>
                {t('unavailable')}
              </h3>
              <div className={style.memberBadgeList}>
                {members.impossible.map((member, index) => (
                  <MemberBadge key={index} variant="gray">
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
