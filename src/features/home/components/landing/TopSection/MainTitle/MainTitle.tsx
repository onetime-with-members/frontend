import cn from '@/lib/cn';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function MainTitle() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

  return (
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
  );
}
