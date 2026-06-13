'use client';

import { ADSENSE_CLIENT_ID } from '@/constants';
import useIsMobile from '@/hooks/useIsMobile';
import useMounted from '@/hooks/useMounted';
import cn from '@/lib/cn';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function AdSenseUnit({
  slot,
  device,
  fixedSize,
  className,
}: {
  slot: string | undefined;
  device: 'mobile' | 'desktop';
  fixedSize?: { width: number; height: number };
  className?: string;
}) {
  const insRef = useRef<HTMLModElement>(null);

  const pathname = usePathname();

  const isMobile = useIsMobile();
  const mounted = useMounted();

  const active = !!slot && mounted && (device === 'desktop') !== isMobile;

  useEffect(() => {
    if (!active) return;
    const ins = insRef.current;
    if (!ins || ins.offsetWidth === 0 || ins.getAttribute('data-ad-status'))
      return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [pathname, active]);

  if (!active) return null;

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-lg bg-gray-05 text-sm-200 text-gray-40',
          fixedSize ? 'mx-auto' : 'h-[100px]',
          className,
        )}
        style={fixedSize}
      >
        AdSense ({slot})
      </div>
    );
  }

  if (fixedSize) {
    return (
      <ins
        key={pathname}
        ref={insRef}
        className={cn('adsbygoogle mx-auto block', className)}
        style={fixedSize}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
      />
    );
  }

  return (
    <ins
      key={pathname}
      ref={insRef}
      className={cn('adsbygoogle block', className)}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
