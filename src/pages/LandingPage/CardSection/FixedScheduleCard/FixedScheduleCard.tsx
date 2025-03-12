import { Trans, useTranslation } from 'react-i18next';

import Card from '../Card/Card';
import cardImageEn from '@/assets/landing/fixed-schedule-en.png';
import cardImageKo from '@/assets/landing/fixed-schedule-ko.png';
import cn from '@/utils/cn';

export default function FixedScheduleCard() {
  const { t, i18n } = useTranslation();

  return (
    <Card
      title={
        <Trans i18nKey="landing.title.card1">
          단 한 번 등록으로{' '}
          <br
            className={cn('hidden', {
              'min-[400px]:block': i18n.language === 'en',
              'min-[300px]:block': i18n.language === 'ko',
            })}
          />
          반복 작업 없이 간편하게
        </Trans>
      }
      badgeTitle={t('landing.badge.card1')}
      description={
        <Trans i18nKey="landing.description.card1">
          내 스케줄을 미리 등록하면{' '}
          <br
            className={cn('hidden', {
              'min-[400px]:block': i18n.language === 'en',
              'min-[300px]:block': i18n.language === 'ko',
            })}
          />
          불가능한 시간은 자동으로 제외돼요.
        </Trans>
      }
      image={
        <div className="mx-auto w-full max-w-[20rem]">
          <img
            src={i18n.language === 'ko' ? cardImageKo : cardImageEn}
            alt="내 스케줄 UI 이미지"
            className="h-full w-full"
          />
        </div>
      }
    />
  );
}
