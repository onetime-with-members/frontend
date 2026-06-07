import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

import cn from '@/lib/cn';

export default function GuideMobileNavPanel({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const t = useTranslations('guide');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('nav.title')}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 flex max-h-[80vh] flex-col rounded-t-2xl bg-gray-00 transition-transform duration-300 ease-out md:hidden',
        isOpen ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="flex justify-center pb-2 pt-3">
        <span className="h-1 w-9 rounded-full bg-gray-15" />
      </div>
      <nav
        onClick={onClose}
        className="flex flex-col gap-6 overflow-y-auto px-3 pb-8 pt-2"
      >
        {children}
      </nav>
    </div>
  );
}
