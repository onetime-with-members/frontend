'use client';

import { useLocale } from 'next-intl';
import { useContext } from 'react';

import { BarBannerContext } from '@/contexts/bar-banner';
import cn from '@/lib/cn';
import { useProgressRouter } from '@/navigation';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';

export default function BarBanner({
  className,
  innnerClassName,
}: {
  className?: string;
  innnerClassName?: string;
}) {
  const { barBanner, isBarBannerShown, closeBarBanner } =
    useContext(BarBannerContext);

  const progressRouter = useProgressRouter();

  const locale = useLocale();

  function handleClick() {
    if (barBanner?.link_url) {
      if (barBanner.link_url.startsWith('/')) {
        progressRouter.push(barBanner.link_url);
      } else {
        window.open(barBanner.link_url, '_blank', 'noopener noreferrer');
      }
    }
  }

  return (
    isBarBannerShown &&
    barBanner && (
      <div
        className={cn(
          {
            'cursor-pointer': barBanner.link_url,
          },
          className,
        )}
        onClick={handleClick}
      >
        <div
          className={cn(
            'flex items-center justify-between p-4',
            innnerClassName,
          )}
          style={{
            backgroundColor: barBanner.background_color_code,
          }}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Image
              src="/images/bar-banner-icon.svg"
              alt="스피커"
              width={20}
              height={20}
            />
            <span
              className="overflow-hidden text-ellipsis whitespace-nowrap text-md-300"
              style={{
                color: barBanner.text_color_code,
              }}
            >
              {locale === 'ko' ? barBanner.content_kor : barBanner.content_eng}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeBarBanner();
            }}
            style={{
              color: barBanner.text_color_code,
            }}
          >
            <IconX size={20} />
          </button>
        </div>
      </div>
    )
  );
}
