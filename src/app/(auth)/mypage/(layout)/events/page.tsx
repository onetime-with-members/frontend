import MyEvent from '@/components/event/my-event';
import GrayBackground from '@/components/gray-background';
import { fetchMyEvents } from '@/lib/actions';
import { Link } from '@/navigation';
import { IconPlus } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('mypage');

  return {
    title: `${t('allEvents')} | OneTime`,
  };
}

export default async function Page() {
  const events = await fetchMyEvents();

  return events.length === 0 ? (
    <EmptyMyEvent />
  ) : (
    <ul className="flex flex-col gap-5 px-4 py-5">
      {events.map((event) => (
        <MyEvent
          key={event.event_id}
          event={event}
          innerClassName="border-0 md:border"
        />
      ))}
      <GrayBackground />
    </ul>
  );
}

async function EmptyMyEvent() {
  const t = await getTranslations('myEvents');

  return (
    <div className="flex h-full translate-y-14 flex-col items-center justify-center gap-8 px-4 md:translate-y-0 md:justify-start md:py-12">
      <div className="text-center text-gray-90 text-lg-200">
        {t('empty.title')}
      </div>
      <Link
        href="/events/new"
        className="flex items-center gap-1 rounded-full bg-primary-40 px-6 py-3 text-gray-00"
      >
        <span className="text-md-200">{t('empty.button')}</span>
        <span>
          <IconPlus size={20} />
        </span>
      </Link>
    </div>
  );
}
