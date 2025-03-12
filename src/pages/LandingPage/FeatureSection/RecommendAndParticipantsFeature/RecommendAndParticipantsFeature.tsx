import { Trans, useTranslation } from 'react-i18next';

import Feature from '../Feature/Feature';
import featureImageEn from '@/assets/landing/recommend-and-participant-en.png';
import featureImageKo from '@/assets/landing/recommend-and-participant-ko.png';
import cn from '@/utils/cn';

export default function RecommendAndParticipantsFeature() {
  const { t, i18n } = useTranslation();

  return (
    <Feature
      title={
        <Trans i18nKey="landing.title.feature1">
          더 이상 스트레스 없는{' '}
          <br
            className={cn('hidden', {
              'min-[350px]:block': i18n.language === 'en',
              'min-[400px]:block md:hidden': i18n.language === 'ko',
            })}
          />
          간편한 일정 조율
        </Trans>
      }
      badgeLabel={t('landing.badge.feature1')}
      description={
        <Trans i18nKey="landing.description.feature1">
          이벤트 참여자와 가장 많은 사람들이 되는 시간을{' '}
          <br
            className={cn('hidden', {
              'min-[400px]:block': i18n.language === 'en',
              'min-[300px]:block': i18n.language === 'ko',
            })}
          />{' '}
          한눈에 확인할 수 있어요.
        </Trans>
      }
      image={
        <div className="w-full max-w-[20rem]">
          <img
            src={i18n.language === 'ko' ? featureImageKo : featureImageEn}
            alt="참여자 및 시간 추천 UI 이미지"
            className="h-full w-full"
          />
        </div>
      }
    />
  );
}
