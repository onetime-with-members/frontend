import { useLocale } from 'next-intl';

import cn from '@/utils/cn';

interface FeatureProps {
  title: React.ReactNode;
  badgeLabel: React.ReactNode;
  description: React.ReactNode;
  image: React.ReactNode;
}

export default function Feature({
  title,
  badgeLabel,
  description,
  image,
}: FeatureProps) {
  const locale = useLocale();

  return (
    <div
      className={cn('mx-auto flex w-full flex-col items-center md:max-w-max', {
        'max-w-[30rem]': locale === 'en',
        'max-w-[20rem]': locale === 'ko',
      })}
    >
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-7">
          <div className="rounded-xl bg-primary-00 px-5 py-2 text-primary-40 text-md-300">
            {badgeLabel}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-[1.625rem] font-bold leading-[1.4] text-gray-80">
              {title}
            </h2>
            <p className="text-center text-gray-40 text-lg-200">
              {description}
            </p>
          </div>
        </div>
        {image}
      </div>
    </div>
  );
}
