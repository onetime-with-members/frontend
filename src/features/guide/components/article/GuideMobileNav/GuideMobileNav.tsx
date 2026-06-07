'use client';

import { ReactNode, useEffect, useState } from 'react';

import GuideMobileNavBar from './GuideMobileNavBar';
import GuideMobileNavSheet from './GuideMobileNavSheet';
import { GuideArticleMeta } from '@/features/guide/types';

export default function GuideMobileNav({
  children,
  article,
}: {
  children: ReactNode;
  article: GuideArticleMeta;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <GuideMobileNavBar
        article={article}
        open={open}
        onOpen={() => setOpen(true)}
      />
      <GuideMobileNavSheet open={open} onClose={() => setOpen(false)}>
        {children}
      </GuideMobileNavSheet>
    </>
  );
}
