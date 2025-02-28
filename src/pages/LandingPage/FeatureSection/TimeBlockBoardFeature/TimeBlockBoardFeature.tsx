import { Trans, useTranslation } from 'react-i18next';

import Feature from '../Feature/Feature';
import featureImage from '@/assets/landing/time-block-board.png';
import cn from '@/utils/cn';

export default function TimeBlockBoardFeature() {
  const { t, i18n } = useTranslation();

  return (
    <Feature
      title={
        <Trans i18nKey="landing.title.feature2">
          가능한 시간은 더 명확하게{' '}
          <br
            className={cn('hidden', {
              'min-[470px]:block': i18n.language === 'en',
              'min-[320px]:block md:hidden': i18n.language === 'ko',
            })}
          />
          선택은 더 간편하게
        </Trans>
      }
      badgeLabel={t('landing.badge.feature2')}
      description={
        <Trans i18nKey="landing.description.feature2">
          가능한 시간을 가늠하기 어려우신가요?{' '}
          <br
            className={cn('hidden', {
              'min-[470px]:block': i18n.language === 'en',
              'min-[320px]:block': i18n.language === 'ko',
            })}
          />
          그렇다면 ‘안되는 시간’을 지워보세요.
        </Trans>
      }
      image={
        <div className="w-full max-w-[20rem]">
          <img
            src={featureImage}
            alt="타임블록 되는 시간 및 안되는 시간 UI 이미지"
            className="h-full w-full"
          />
        </div>
      }
    />
  );
}
