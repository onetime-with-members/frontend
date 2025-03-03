import { useLocale, useTranslations } from 'next-intl';

import Button from '@/components/button/Button/Button';
import cn from '@/utils/cn';
import { useRouter } from 'next/navigation';

export default function BottomContent() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('landing');

  function handleStartButtonClick() {
    router.push('/events/new');
  }

  return (
    <>
      <div className="mt-11 flex flex-col items-center gap-3 px-4">
        <h1 className="text-center text-[1.75rem] font-bold leading-normal text-gray-80">
          {t('title.main')}
        </h1>
        <p className="text-center text-gray-40 text-md-200">
          {t.rich('description.main', {
            br: () => (
              <br
                className={cn('hidden', {
                  'min-[300px]:block': locale === 'ko',
                  'min-[400px]:block': locale === 'en',
                })}
              ></br>
            ),
          })}
        </p>
      </div>
      <div className="sticky bottom-4 z-30 mx-auto mt-9 flex w-full items-center justify-center px-4">
        <Button
          variant="dark"
          className="w-full max-w-80"
          onClick={handleStartButtonClick}
          fullWidth
        >
          {t('button.start')}
        </Button>
      </div>
    </>
  );
}
