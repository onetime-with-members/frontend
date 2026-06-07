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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <GuideMobileNavBar
        article={article}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
      />
      <GuideMobileNavSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </GuideMobileNavSheet>
    </>
  );
}
