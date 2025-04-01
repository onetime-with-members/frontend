'use client';

import { useLocale } from 'next-intl';

import {
  useBarBanner,
  useBarBannerActions,
  useBarBannerShown,
} from '@/stores/bar-banner';
import cn from '@/utils/cn';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';

export default function BarBanner({
  className,
  innnerClassName,
}: {
  className?: string;
  innnerClassName?: string;
}) {
  const barBanner = useBarBanner();
  const isShown = useBarBannerShown();
  const { closeBarBanner } = useBarBannerActions();

  const locale = useLocale();

  return (
    isShown && (
      <div className={className}>
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
            onClick={closeBarBanner}
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
