import Feature from '../Feature';
import cn from '@/lib/cn';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function RecommendAndParticipantsFeature() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

  return (
    <Feature
      title={t.rich('title.feature1', {
        br: () => (
          <br
            className={cn('hidden', {
              'min-[350px]:block': locale === 'en',
              'min-[400px]:block md:hidden': locale === 'ko',
            })}
          />
        ),
      })}
      badgeLabel={t('badge.feature1')}
      description={t.rich('description.feature1', {
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
        <div className="w-full max-w-[20rem]">
          <Image
            src={`/images/landing/recommend-and-participant-${locale}.png`}
            alt="참여자 및 시간 추천 UI 이미지"
            width={280}
            height={241}
            className="h-full w-full"
          />
        </div>
      }
    />
  );
}
