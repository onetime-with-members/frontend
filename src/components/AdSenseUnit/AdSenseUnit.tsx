'use client';

import { ADSENSE_CLIENT_ID, ADSENSE_PLACEHOLDER_HEIGHT } from '@/constants';
import cn from '@/lib/cn';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: object[];
  }
}

interface AdSenseUnitProps {
  slot: string | undefined;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export default function AdSenseUnit({
  slot,
  format = 'auto',
  className,
}: AdSenseUnitProps) {
  const pathname = usePathname();
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const ins = insRef.current;
    if (!ins || ins.offsetWidth === 0 || ins.getAttribute('data-ad-status'))
      return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [pathname]);

  if (!slot) return null;

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
      className={cn('adsbygoogle block', className)}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={format === 'auto' ? 'true' : undefined}
    />
  );
}
