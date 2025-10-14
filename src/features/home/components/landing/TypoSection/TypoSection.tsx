import cn from '@/lib/cn';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function TypoSection() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

  return (
    <section className="flex flex-col items-center gap-3 px-4 py-[7.5rem]">
      <div>
        <Image
          src="/images/landing/typo-clock.svg"
          alt="시계 아이콘"
          width={33}
          height={30}
        />
      </div>
      <p className="text-center text-[1.625rem] font-bold text-primary-50">
        {t.rich('title.highlight', {
          br: () => (
            <br
              className={cn('hidden', {
                'min-[450px]:block': locale === 'en',
                'min-[220px]:block': locale === 'ko',
              })}
            />
          ),
        })}
      </p>
    </section>
  );
}
