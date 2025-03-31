'use client';

import { useBarBanner, useBarBannerActions } from '@/stores/bar-banner';
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
  const isShown = useBarBanner();
  const { hideBarBanner } = useBarBannerActions();

  function handleClose() {
    hideBarBanner();
  }

  return (
    isShown && (
      <div className={className}>
        <div
          className={cn(
            'flex items-center justify-between bg-primary-40 p-4',
            innnerClassName,
          )}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/images/bar-banner-icon.svg"
              alt="스피커"
              width={20}
              height={20}
            />
            <span className="text-gray-00 text-md-300">
              개강 필수 에브리타임 연동기능 출시!
            </span>
          </div>
          <button className="text-primary-10" onClick={handleClose}>
            <IconX size={20} />
          </button>
        </div>
      </div>
    )
  );
}
