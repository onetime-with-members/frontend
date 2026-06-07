'use client';

import { useLocale, useTranslations } from 'next-intl';

import { GUIDE_SECTION_MESSAGE_KEY } from '@/features/guide/constants';
import { GuideArticleMeta, GuideLocale } from '@/features/guide/types';

export default function GuideMobileNavBar({
  article,
  open,
  onOpen,
}: {
  article: GuideArticleMeta;
  open: boolean;
  onOpen: () => void;
}) {
  const locale = useLocale() as GuideLocale;
  const t = useTranslations('guide');

  const sectionTitle = t(
    `sections.${GUIDE_SECTION_MESSAGE_KEY[article.section]}`,
  );

  return (
    <>
      <div className="fixed inset-x-0 top-14 z-20 flex h-12 items-center gap-3 border-y border-gray-10 bg-gray-00 px-4 md:hidden">
        <p className="min-w-0 flex-1 truncate text-gray-90 text-sm-200">
          <span className="text-gray-40">{sectionTitle} · </span>
          {article.title[locale]}
        </p>
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 font-semibold text-gray-00 text-sm-100"
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
          {t('nav.menu')}
        </button>
      </div>
      <div className="h-12 md:hidden" aria-hidden />
    </>
  );
}
