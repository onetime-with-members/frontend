import Card from '../Card';
import cn from '@/lib/cn';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function FixedScheduleCard() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

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
