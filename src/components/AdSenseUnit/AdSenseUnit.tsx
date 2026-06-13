'use client';

import { ADSENSE_CLIENT_ID, ADSENSE_PLACEHOLDER_HEIGHT } from '@/constants';
import useIsMobile from '@/hooks/useIsMobile';
import useMounted from '@/hooks/useMounted';
import cn from '@/lib/cn';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function AdSenseUnit({
  slot,
  device,
  format = 'auto',
  className,
}: {
  slot: string | undefined;
  device: 'mobile' | 'desktop';
  format?: 'auto' | 'horizontal' | 'rectangle';
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
          ADSENSE_PLACEHOLDER_HEIGHT[format],
          className,
        )}
      >
        AdSense ({slot})
      </div>
    );
  }

  return (
    <ins
      key={pathname}
      ref={insRef}
      className={cn(
        'adsbygoogle block',
        format !== 'auto' && ADSENSE_PLACEHOLDER_HEIGHT[format],
        className,
      )}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={format === 'auto' ? 'true' : undefined}
    />
  );
}
