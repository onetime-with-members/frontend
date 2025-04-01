'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { useBarBanner, useBarBannerActions } from '@/stores/bar-banner';
import { Banner } from '@/types/banner.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { IconX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function BarBanner({
  className,
  innnerClassName,
}: {
  className?: string;
  innnerClassName?: string;
}) {
  const isShown = useBarBanner();
  const { hideBarBanner } = useBarBannerActions();

  const { data, isError } = useQuery<Banner>({
    queryKey: ['banners', 'activated'],
    queryFn: async () => {
      const res = await axios.get('/banners/activated');
      return res.data.payload;
    },
    retry: false,
  });

  const locale = useLocale();

  function handleClose() {
    hideBarBanner();
  }

  useEffect(() => {
    if (isError) {
      hideBarBanner();
    }
  }, [isError, hideBarBanner]);

  return (
    data &&
    isShown && (
      <div className={className}>
        <div
          className={cn(
            'flex items-center justify-between p-4',
            innnerClassName,
          )}
          style={{
            backgroundColor: data.background_color_code,
          }}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/images/bar-banner-icon.svg"
              alt="스피커"
              width={20}
              height={20}
            />
            <span
              className="overflow-hidden text-ellipsis whitespace-nowrap text-md-300"
              style={{
                color: data.text_color_code,
              }}
            >
              {locale === 'ko' ? data.content_kor : data.content_eng}
            </span>
          </div>
          <button
            onClick={handleClose}
            style={{
              color: data.text_color_code,
            }}
          >
            <IconX size={20} />
          </button>
        </div>
      </div>
    )
  );
}
