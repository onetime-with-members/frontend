'use client';

import nProgress from 'nprogress';
import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

export default function ProgressBar() {
  const [, setIsLoading] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    nProgress.configure({ minimum: 0.2, speed: 400, trickleSpeed: 50 });
    nProgress.start();

    const timer = setTimeout(() => {
      nProgress.done();
      setIsLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
