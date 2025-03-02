import Lottie from 'lottie-react';
import { Trans, useTranslation } from 'react-i18next';

import clockLottie from '@/assets/lottie/landing-clock.json';
import cn from '@/utils/cn';

export default function TopContent() {
  const { i18n } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="h-[152px] w-[152px]">
        <Lottie animationData={clockLottie} />
      </div>
      <p className="text-center text-gray-00 title-md-300">
        <Trans i18nKey="landing.title.last">
          원타임에서 더 이상 스트레스 없는{' '}
          <br
            className={cn('hidden', {
              'min-[440px]:block': i18n.language === 'en',
              'min-[320px]:block': i18n.language === 'ko',
            })}
          />
          간편한 일정조율을 경험하세요
        </Trans>
      </p>
    </div>
  );
}
