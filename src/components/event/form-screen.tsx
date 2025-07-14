'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import GrayBackground from '../gray-background';
import InputContent from './input-content';
import Button from '@/components/button';
import NavBar from '@/components/nav-bar';
import { PageModeContext } from '@/contexts/page-mode';
import { createEventAction, editEventAction } from '@/lib/api/actions';
import { eventWithAuthQueryOptions } from '@/lib/api/query-options';
import { defaultEventValue } from '@/lib/constants';
import { EventValueType } from '@/lib/types';
import { EventFormType } from '@/lib/validation/form-types';
import { eventSchema } from '@/lib/validation/schema';
import { useProgressRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
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
  const { pageMode } = useContext(PageModeContext);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid },
    control,
    watch,
    reset,
  } = useForm<EventFormType>({
    mode: 'onChange',
    defaultValues: originData || defaultEventValue,
    resolver: zodResolver(eventSchema),
  });

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
    mutationFn: createEventAction,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      progressRouter.push(`/events/${data.event_id}`);
    },
  });

  const { mutateAsync: editEvent } = useMutation({
    mutationFn: editEventAction,
    onSuccess: async (_, { eventId }) => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      progressRouter.push(`/events/${eventId}`);
    },
  });

  const onSubmit: SubmitHandler<EventFormType> = async (data) => {
    if (type === 'create') {
      await createEvent(data);
    } else {
      await editEvent({ eventId: params.id, event: data });
    }
  };

  useEffect(() => {
    if (originData) reset(originData);
  }, [originData]);

  useEffect(() => {
    if (!event) return;
    if (event.event_status !== 'CREATOR') {
      router.push(`/events/${params.id}`);
    }
  }, [event]);

  return (
    <>
      {/* Gray Background */}
      <GrayBackground device="desktop" breakpoint="md" />

      {/* Form Content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center pb-40"
      >
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
            <InputContent
              value={watch()}
              setValue={setValue}
              register={register}
              control={control}
            />
          </main>
        </div>

        {/* Bottom Floating Button */}
        <div className="sticky bottom-0 left-0 w-full bg-gray-00 px-4 py-4 md:static md:w-[25rem] md:bg-transparent">
          <Button type="submit" variant="dark" disabled={!isValid} fullWidth>
            {pageMode === 'create' && t('createEvent')}
            {pageMode === 'edit' && t('editEvent')}
          </Button>
        </div>
      </form>
    </>
  );
}
