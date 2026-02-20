import { useTranslations } from 'next-intl';

import Header from '../../Header';
import { useRecentMyEventListQuery } from '@/features/user/api/user.query';
import cn from '@/lib/cn';

export default function MyEventsHeader() {
  const t = useTranslations('DashboardPage');

  const { data: myEventList } = useRecentMyEventListQuery();

  return (
    <Header moreHref="/mypage/events">
      <span
        className={cn('block md:hidden', {
          'md:block': myEventList.length === 1,
        })}
      >
        {t('recentEvent')}
      </span>
      <span
        className={cn('hidden md:block', {
          'md:hidden': myEventList.length === 1,
        })}
      >
        {t('recentEvents')}
      </span>
    </Header>
  );
}
