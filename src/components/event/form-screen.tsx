'use client';

import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import InputContent from './input-content';
import Button from '@/components/button';
import NavBar from '@/components/nav-bar';
import { PageModeContext } from '@/contexts/page-mode';
import { createEvent, editEvent } from '@/lib/actions';
import cn from '@/lib/cn';
import { breakpoint, defaultEventValue } from '@/lib/constants';
import { EventValueType } from '@/lib/types';
import { useRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function EventFormScreen({
  type,
  originData,
}: {
  type: 'create' | 'edit';
  originData?: EventValueType;
}) {
  const [value, setValue] = useState<EventValueType>(
    originData || defaultEventValue,
  );
  const [disabled, setDisabled] = useState(type === 'create');

  const router = useRouter();
  const params = useParams<{ id: string }>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;

    const formData = new FormData();
    formData.set('event', JSON.stringify(value));

    if (type === 'create') {
      await createEvent(formData);
    } else {
      formData.set('eventId', params.id);
      await editEvent(formData);
    }
  }

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
    <form onSubmit={handleSubmit} className="flex flex-col items-center pb-40">
      <div className="w-full md:px-4">
        {/* Top Navigation Bar for Desktop */}
        <NavBar variant="default" className="hidden md:flex" />
        {/* Top Navigation Bar for Mobile */}
        <NavBar variant="black" className="flex md:hidden" />

        <main className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center md:pt-6">
          {/* Top Actions for Desktop */}
          <div className="hidden w-full items-center justify-start pb-6 md:flex">
            <button
              type="button"
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
        <SubmitButton disabled={disabled} />
      </div>
    </form>
  );
}

export function SubmitButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  const { pageMode } = useContext(PageModeContext);

  const t = useTranslations('eventForm');

  return (
    <Button
      type="submit"
      variant="dark"
      fullWidth
      className={cn(
        {
          'cursor-default': pending,
        },
        className,
      )}
      {...props}
    >
      {pageMode === 'create' &&
        (pending ? t('creatingEvent') : t('createEvent'))}
      {pageMode === 'edit' && (pending ? t('editingEvent') : t('editEvent'))}
    </Button>
  );
}
