'use client';

import { useTranslations } from 'next-intl';

import MyEvent from '@/components/event/my-event';
import GrayBackground from '@/components/gray-background';
import { myEventsQueryOption } from '@/lib/query-data';
import { ProgressLink } from '@/navigation';
import { IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

export default function MyEventsPage() {
  const { data: myEvents } = useQuery({ ...myEventsQueryOption });

  return myEvents?.length === 0 ? (
    <EmptyMyEvent />
  ) : (
    <div className="flex flex-col gap-5 px-4 py-5">
      {myEvents?.map((event) => (
        <MyEvent
          key={event.event_id}
          event={event}
          className="border-0 md:border"
        />
      ))}
      <GrayBackground device="mobile" breakpoint="md" />
    </div>
  );
}

function EmptyMyEvent() {
  const t = useTranslations('myEvents');

  return (
    <div className="flex h-full translate-y-14 flex-col items-center justify-center gap-8 px-4 md:translate-y-0 md:justify-start md:py-12">
      <div className="text-center text-gray-90 text-lg-200">
        {t('empty.title')}
      </div>
      <ProgressLink
        href="/events/new"
        className="flex items-center gap-1 rounded-full bg-primary-40 px-6 py-3 text-gray-00"
      >
        <span className="text-md-200">{t('empty.button')}</span>
        <span>
          <IconPlus size={20} />
        </span>
      </ProgressLink>
    </div>
  );
}
