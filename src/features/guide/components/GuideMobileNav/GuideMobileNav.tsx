'use client';

import { useEffect, useState } from 'react';

import GuideNavList from '../GuideNavList';
import cn from '@/lib/cn';

interface NavArticle {
  slug: string;
  title: string;
}

interface NavSection {
  id: string;
  title: string;
  articles: NavArticle[];
}

export default function GuideMobileNav({
  sections,
  navTitle,
  buttonLabel,
  sectionTitle,
  articleTitle,
  activeSlug,
}: {
  sections: NavSection[];
  navTitle: string;
  buttonLabel: string;
  sectionTitle: string;
  articleTitle: string;
  activeSlug: string;
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
      <div className="fixed inset-x-0 top-14 z-20 flex h-12 items-center gap-3 border-y border-gray-10 bg-gray-00 px-4 md:hidden">
        <p className="min-w-0 flex-1 truncate text-sm-200 text-gray-90">
          <span className="text-gray-40">{sectionTitle} · </span>
          {articleTitle}
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm-100 font-semibold text-gray-00"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M4 6h16M4 12h16M4 18h10" />
          </svg>
          {buttonLabel}
        </button>
      </div>
      <div className="h-12 md:hidden" aria-hidden />

      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={cn(
          'fixed inset-0 z-50 bg-gray-90/40 transition-opacity duration-200 md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={navTitle}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex max-h-[80vh] flex-col rounded-t-2xl bg-gray-00 transition-transform duration-300 ease-out md:hidden',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="flex justify-center pb-2 pt-3">
          <span className="h-1 w-9 rounded-full bg-gray-15" />
        </div>
        <nav
          onClick={() => setOpen(false)}
          className="flex flex-col gap-6 overflow-y-auto px-3 pb-8 pt-2"
        >
          <GuideNavList sections={sections} activeSlug={activeSlug} />
        </nav>
      </div>
    </>
  );
}
