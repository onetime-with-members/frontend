import { useLocale, useTranslations } from 'next-intl';

import Feature from '../Feature/Feature';
import cn from '@/utils/cn';
import Image from 'next/image';

export default function TimeBlockBoardFeature() {
  const t = useTranslations('landing');
  const locale = useLocale();

  return (
    <Feature
      title={t.rich('title.feature2', {
        br: () => (
          <br
            className={cn('hidden', {
              'min-[470px]:block': locale === 'en',
              'min-[320px]:block md:hidden': locale === 'ko',
            })}
          />
        ),
      })}
      badgeLabel={t('badge.feature2')}
      description={t.rich('description.feature2', {
        br: () => (
          <br
            className={cn('hidden', {
              'min-[470px]:block': locale === 'en',
              'min-[320px]:block': locale === 'ko',
            })}
          />
        ),
      })}
      image={
        <div className="w-full max-w-[20rem]">
          <Image
            src={`/images/landing/time-block-board-${locale}.png`}
            alt="타임블록 되는 시간 및 안되는 시간 UI 이미지"
            width={320}
            height={279}
            className="h-full w-full"
          />
        </div>
      }
    />
  );
}
