import { Trans, useTranslation } from 'react-i18next';

import clockIcon from '@/assets/landing/typo-clock.svg';
import cn from '@/utils/cn';

export default function TypoSection() {
  const { i18n } = useTranslation();

  return (
    <section className="flex flex-col items-center gap-3 py-[7.5rem]">
      <div>
        <img src={clockIcon} alt="시계 아이콘" />
      </div>
      <p className="text-center text-[1.625rem] font-bold text-primary-50">
        <Trans i18nKey="landing.title.highlight">
          내 일정에 맞게{' '}
          <br
            className={cn('hidden', {
              'min-[450px]:block': i18n.language === 'en',
              'min-[220px]:block': i18n.language === 'ko',
            })}
          />
          자동으로 시간 조율,{' '}
          <br
            className={cn('hidden', {
              'min-[450px]:block': i18n.language === 'en',
              'min-[220px]:block': i18n.language === 'ko',
            })}
          />
          더 이상 고민하지 마세요!
        </Trans>
      </p>
    </section>
  );
}
