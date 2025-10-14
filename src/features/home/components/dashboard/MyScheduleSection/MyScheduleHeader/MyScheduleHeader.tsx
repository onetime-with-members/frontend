import { useTranslations } from 'next-intl';

import Header from '../../Header';

export default function MyScheduleHeader() {
  const t = useTranslations('userDashboard');

  return (
    <Header hasMore={false} description={t('myScheduleDescription')}>
      {t('mySchedule')}
    </Header>
  );
}
