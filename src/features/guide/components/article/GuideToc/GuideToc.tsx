'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import GuideTocLink from './GuideTocLink';
import { GuideTocItem } from '@/features/guide/types';

export default function GuideToc({ items }: { items: GuideTocItem[] }) {
  const t = useTranslations('guide');
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px' },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden md:sticky md:top-20 md:block md:h-fit md:w-44 md:shrink-0 lg:w-48">
      <p className="mb-3 text-gray-40 text-sm-300">{t('toc.title')}</p>
      <ul className="flex flex-col">
        {items.map((item) => (
          <GuideTocLink
            key={item.id}
            item={item}
            isActive={item.id === activeId}
          />
        ))}
      </ul>
    </aside>
  );
}
