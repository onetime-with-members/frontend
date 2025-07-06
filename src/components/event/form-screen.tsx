'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import InputContent from './input-content';
import Button from '@/components/button';
import NavBar from '@/components/nav-bar';
import { PageModeContext } from '@/contexts/page-mode';
import { createEventApi, editEventApi } from '@/lib/api/actions';
import { eventWithAuthQueryOptions } from '@/lib/api/query-options';
import { breakpoint, defaultEventValue } from '@/lib/constants';
import dayjs from '@/lib/dayjs';
import { EventValueType } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

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

  const { pageMode } = useContext(PageModeContext);

  const router = useRouter();
  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const t = useTranslations('eventForm');

  const { data: event } = useQuery({
    ...eventWithAuthQueryOptions(params.id),
    enabled: type === 'edit',
  });

  const { mutateAsync: createEvent } = useMutation({
    mutationFn: createEventApi,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      progressRouter.push(`/events/${data.event_id}`);
    },
  });

  const { mutateAsync: editEvent } = useMutation({
    mutationFn: editEventApi,
    onSuccess: async (_, { eventId }) => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      progressRouter.push(`/events/${eventId}`);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;
    if (type === 'create') {
      await createEvent(value);
    } else {
      await editEvent({ eventId: params.id, event: value });
    }
  }

  useEffect(() => {
    if (!event) return;
    if (event.event_status !== 'CREATOR') {
      router.push(`/events/${params.id}`);
    }
  }, [event]);

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
        <Button type="submit" variant="dark" fullWidth>
          {pageMode === 'create' && t('createEvent')}
          {pageMode === 'edit' && t('editEvent')}
        </Button>
      </div>
    </form>
  );
}
