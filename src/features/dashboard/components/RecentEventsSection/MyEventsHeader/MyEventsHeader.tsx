import { useTranslations } from 'next-intl';

import Header from '../../Header';
import { myEventsQueryOptions } from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { useQuery } from '@tanstack/react-query';

export default function MyEventsHeader() {
  const { data: myEvents } = useQuery({ ...myEventsQueryOptions });

  const t = useTranslations('userDashboard');

  return (
    <Header moreHref="/mypage/events">
      <span
        className={cn('block md:hidden', {
          'md:block': myEvents?.length === 1,
        })}
      >
        {t('recentEvent')}
      </span>
      <span
        className={cn('hidden md:block', {
          'md:hidden': myEvents?.length === 1,
        })}
      >
        {t('recentEvents')}
      </span>
    </Header>
  );
}
