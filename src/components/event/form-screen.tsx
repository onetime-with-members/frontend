import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import InputContent from './input-content';
import Button from '@/components/button/button';
import NavBar from '@/components/nav-bar';
import { PageModeContext } from '@/contexts/PageModeContext';
import cn from '@/lib/cn';
import { breakpoint } from '@/lib/constants';
import { EventValueType } from '@/lib/types';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface EventFormContentProps {
  originData?: EventValueType;
  onSubmit: (disabled: boolean, value: EventValueType) => void;
  isPending: boolean;
}

export default function EventFormContent({
  originData,
  onSubmit,
  isPending,
}: EventFormContentProps) {
  const [value, setValue] = useState<EventValueType>({
    title: '',
    start_time: '09:00',
    end_time: '24:00',
    category: 'DATE',
    ranges: [],
  });
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();
  const t = useTranslations('eventForm');

  const { pageMode } = useContext(PageModeContext);

  useEffect(() => {
    if (!originData) return;

    setValue(originData);
  }, [originData]);

  useEffect(() => {
    const startTime = dayjs(value.start_time, 'HH:mm');
    const endTime = dayjs(value.end_time, 'HH:mm');

    setDisabled(
      value.title.trim() === '' ||
        value.title.trim().length > 50 ||
        value.ranges.length === 0 ||
        startTime.isAfter(endTime) ||
        startTime.isSame(endTime),
    );
  }, [value]);

  useEffect(() => {
    function updateBackgroundColor() {
      if (window.innerWidth >= breakpoint.md) {
        document.body.style.backgroundColor = '#F9F9F9';
      } else {
        document.body.style.backgroundColor = '';
      }
    }

    updateBackgroundColor();

    window.addEventListener('resize', updateBackgroundColor);

    return () => {
      document.body.style.backgroundColor = '';
      window.removeEventListener('resize', updateBackgroundColor);
    };
  }, []);

  return (
    <div className="flex flex-col items-center pb-40">
      <div className="w-full md:px-4">
        {/* Top Navigation Bar for Desktop */}
        <NavBar variant="default" className="hidden md:flex" />
        {/* Top Navigation Bar for Mobile */}
        <NavBar variant="black" className="flex md:hidden" />

        <main className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center md:pt-6">
          {/* Top Actions for Desktop */}
          <div className="hidden w-full items-center justify-start pb-6 md:flex">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center"
            >
              <IconChevronLeft size={24} />
            </button>
          </div>

          {/* Main Content with Inputs */}
          <InputContent value={value} setValue={setValue} />
        </main>
      </div>

      {/* Bottom Floating Button */}
      <div className="sticky bottom-0 left-0 w-full bg-gray-00 px-4 py-4 md:static md:w-[25rem] md:bg-transparent">
        <Button
          onClick={() =>
            onSubmit(disabled, {
              ...value,
              title: value.title.trim(),
            })
          }
          disabled={disabled}
          variant="dark"
          fullWidth
          className={cn({
            'cursor-default': isPending,
          })}
        >
          {pageMode === 'create' &&
            (isPending ? t('creatingEvent') : t('createEvent'))}
          {pageMode === 'edit' &&
            (isPending ? t('editingEvent') : t('editEvent'))}
        </Button>
      </div>
    </div>
  );
}
