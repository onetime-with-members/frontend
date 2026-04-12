'use client';

import { useTranslations } from 'next-intl';
import type { MyScheduleRequestModalSlideMessageKey } from '@/features/my-schedule/types';

type Props = {
  messageKey: MyScheduleRequestModalSlideMessageKey;
};

export default function MyScheduleRequestModalSlideText({
  messageKey,
}: Props) {
  const t = useTranslations('mySchedule.components.MyScheduleRequestModal');

  return (
    <div className="flex flex-col items-center justify-center gap-1 px-4 pb-6 pt-0">
      <span className="text-center text-gray-80 text-lg-300">
        {t.rich(`${messageKey}.title`, {
          br: () => <br />,
        })}
      </span>
      <span className="text-center text-gray-50 text-md-200">
        {t(`${messageKey}.description`)}
      </span>
    </div>
  );
}
