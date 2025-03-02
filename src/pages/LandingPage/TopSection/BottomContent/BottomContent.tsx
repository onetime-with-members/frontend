import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/button/Button/Button';
import cn from '@/utils/cn';

export default function BottomContent() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  function handleStartButtonClick() {
    navigate('/events/new');
  }

  return (
    <>
      <div className="mt-11 flex flex-col items-center gap-3 px-4">
        <h1 className="text-center text-[1.75rem] font-bold leading-normal text-gray-80">
          {t('landing.title.main')}
        </h1>
        <p className="text-center text-gray-40 text-md-200">
          <Trans i18nKey="landing.description.main">
            링크 공유 한 번으로 여러 사람과 일정을{' '}
            <br
              className={cn('hidden', {
                'min-[300px]:block': i18n.language === 'ko',
                'min-[400px]:block': i18n.language === 'en',
              })}
            />
            정리하고, 가장 적합한 시간을 찾아보세요.
          </Trans>
        </p>
      </div>
      <div className="sticky bottom-4 z-30 mx-auto mt-9 flex w-full items-center justify-center px-4">
        <Button
          variant="dark"
          className="w-full max-w-80"
          onClick={handleStartButtonClick}
          fullWidth
        >
          {t('landing.button.start')}
        </Button>
      </div>
    </>
  );
}
