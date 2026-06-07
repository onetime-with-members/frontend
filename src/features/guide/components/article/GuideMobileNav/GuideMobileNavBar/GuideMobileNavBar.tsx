import { useLocale, useTranslations } from 'next-intl';

import { MenuIcon } from '@/components/icon';
import { GUIDE_SECTION_MESSAGE_KEY } from '@/features/guide/constants';
import { GuideArticleMeta } from '@/features/guide/types';

export default function GuideMobileNavBar({
  article,
  isOpen,
  onOpen,
}: {
  article: GuideArticleMeta;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const locale = useLocale();
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
          aria-expanded={isOpen}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 font-semibold text-gray-00 text-sm-100"
        >
          <MenuIcon width={15} height={15} aria-hidden />
          {t('nav.menu')}
        </button>
      </div>
      <div className="h-12 md:hidden" aria-hidden />
    </>
  );
}
