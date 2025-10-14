import { useTranslations } from 'next-intl';

import Header from '../../Header';
import { useMyEventsQuery } from '@/features/user/api/user.queries';
import cn from '@/lib/cn';

export default function MyEventsHeader() {
  const { data: myEvents } = useMyEventsQuery();

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
