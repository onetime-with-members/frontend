'use client';

import nProgress from 'nprogress';
import { useEffect } from 'react';

import { usePathname } from '@/i18n/navigation';

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    nProgress.configure({ minimum: 0.3, speed: 500, trickleSpeed: 50 });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      nProgress.done();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
