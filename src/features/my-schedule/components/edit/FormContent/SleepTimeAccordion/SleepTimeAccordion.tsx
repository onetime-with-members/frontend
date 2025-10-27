import { useTranslations } from 'next-intl';

import TimeDropdown from '@/components/dropdown/time-dropdown';
import SleepIcon from '@/components/icon/SleepTimeIcon';
import { SleepTime } from '@/features/my-schedule/models';
import cn from '@/lib/cn';
import { IconChevronDown } from '@tabler/icons-react';

export default function SleepTimeAccordion({
  sleepTime,
  setSleepTime,
  isAccordionOpen,
  setIsAccordionOpen,
}: {
  sleepTime: SleepTime;
  setSleepTime: (sleepTime: SleepTime) => void;
  isAccordionOpen: boolean;
  setIsAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations('myScheduleEdit');

  return (
    <div className="sticky top-[120px] z-20 flex flex-col gap-3 bg-gray-05 px-5 py-4">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsAccordionOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-xl text-gray-60">
            <SleepIcon />
          </span>
          <span className="text-gray-80 text-md-300">{t('sleepTime')}</span>
        </div>
        <div>
          <IconChevronDown
            size={24}
            className={cn('text-gray-40', {
              'rotate-180': isAccordionOpen,
            })}
          />
        </div>
      </div>

      {isAccordionOpen && (
        <div className="flex items-center gap-4">
          <TimeDropdown
            variant="white"
            time={sleepTime.startTime}
            setTime={(time) =>
              setSleepTime(
                new SleepTime({
                  sleep_start_time: time,
                  sleep_end_time: sleepTime.endTime,
                }),
              )
            }
            className="flex-1"
          />
          <span className="text-gray-40 text-md-300">-</span>
          <TimeDropdown
            variant="white"
            time={sleepTime.endTime}
            setTime={(time) =>
              setSleepTime(
                new SleepTime({
                  sleep_start_time: sleepTime.startTime,
                  sleep_end_time: time,
                }),
              )
            }
            className="flex-1"
          />
        </div>
      )}
    </div>
  );
}
