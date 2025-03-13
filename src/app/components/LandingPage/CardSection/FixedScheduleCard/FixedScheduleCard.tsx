import { useLocale, useTranslations } from 'next-intl';

import Card from '../Card/Card';
import cn from '@/utils/cn';
import Image from 'next/image';

export default function FixedScheduleCard() {
  const t = useTranslations('landing');
  const locale = useLocale();

  return (
    <Card
      title={t.rich('title.card1', {
        br: () => (
          <br
            className={cn('hidden', {
              'min-[400px]:block': locale === 'en',
              'min-[300px]:block': locale === 'ko',
            })}
          />
        ),
      })}
      badgeTitle={t('badge.card1')}
      description={t.rich('description.card1', {
        br: () => (
          <br
            className={cn('hidden', {
              'min-[400px]:block': locale === 'en',
              'min-[300px]:block': locale === 'ko',
            })}
          />
        ),
      })}
      image={
        <div className="mx-auto w-full max-w-[20rem]">
          <Image
            src={`/images/landing/fixed-schedule-${locale}.png`}
            alt="내 스케줄 UI 이미지"
            width={316}
            height={296}
            className="h-full w-full"
          />
        </div>
      }
    />
  );
}
