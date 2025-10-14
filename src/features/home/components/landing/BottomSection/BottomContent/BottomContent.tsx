import clockLottie from '@/assets/lotties/landing-clock.json';
import Lottie from '@/components/lottie';
import cn from '@/lib/cn';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function BottomContent() {
  const locale = await getLocale();
  const t = await getTranslations('landing');

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="h-[152px] w-[152px]">
        <Lottie animationData={clockLottie} />
      </div>
      <p className="text-center text-gray-00 title-md-300">
        {t.rich('title.last', {
          br: () => (
            <br
              className={cn('hidden', {
                'min-[440px]:block': locale === 'en',
                'min-[320px]:block': locale === 'ko',
              })}
            />
          ),
        })}
      </p>
    </div>
  );
}
